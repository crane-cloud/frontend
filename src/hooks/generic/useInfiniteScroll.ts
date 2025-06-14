import { useCallback, useEffect, useRef, useState } from "react";

interface PaginationData {
  pages?: number;
  total?: number;
  page?: number;
  per_page?: number;
  next?: number | null;
  prev?: number | null;
  has_next?: boolean;
}

interface UseInfiniteScrollWithPaginationOptions<T> {
  loading: boolean;
  success: boolean;
  data: any;
  extractItems: (data: any) => T[];
  extractPagination: (data: any) => PaginationData;
  extractItemId: (item: T) => string | number;
  onLoadMore: (page: number) => void;
  resetTrigger?: any;
}

interface UseInfiniteScrollWithPaginationReturn<T> {
  items: T[];
  currentPage: number;
  hasMore: boolean;
  lastElementRef: (node: HTMLElement | null) => void;
  resetList: () => void;
  pagination: PaginationData;
}

export const useInfiniteScrollWithPagination = <T = any>({
  loading,
  success,
  data,
  extractItems,
  extractPagination,
  extractItemId,
  onLoadMore,
  resetTrigger,
}: UseInfiniteScrollWithPaginationOptions<T>): UseInfiniteScrollWithPaginationReturn<T> => {
  const [items, setItems] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [processedPages, setProcessedPages] = useState<Set<number>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);

  const hasMore =
    pagination.has_next !== undefined
      ? pagination.has_next
      : pagination.next !== null && pagination.next !== undefined;

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && !processedPages.has(currentPage + 1)) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onLoadMore(nextPage);
    }
  }, [loading, hasMore, currentPage, onLoadMore, processedPages]);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, handleLoadMore],
  );

  const resetList = useCallback(() => {
    setItems([]);
    setCurrentPage(1);
    setPagination({});
    setProcessedPages(new Set());
    if (observer.current) {
      observer.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (success && data) {
      const newItems = extractItems(data);
      const newPagination = extractPagination(data);
      const pageFromData = newPagination?.page || currentPage;

      // Skip already processed pages
      if (processedPages.has(pageFromData)) {
        return;
      }

      setItems((prev) => {
        if (currentPage === 1 || pageFromData === 1) {
          setProcessedPages(new Set([pageFromData]));
          return newItems;
        }

        const existingItemsMap = new Map(
          prev.map((item) => [extractItemId(item), item]),
        );

        const uniqueNewItems = newItems.filter(
          (item) => !existingItemsMap.has(extractItemId(item)),
        );

        setProcessedPages((prev) => new Set([...prev, pageFromData]));
        return [...prev, ...uniqueNewItems];
      });

      setPagination(newPagination);
    }
  }, [
    success,
    data,
    currentPage,
    extractItems,
    extractPagination,
    extractItemId,
    processedPages,
  ]);

  useEffect(() => {
    if (resetTrigger !== undefined) {
      resetList();
      setCurrentPage(1);
      onLoadMore(1);
    }
  }, [resetTrigger]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return {
    items,
    currentPage,
    hasMore,
    lastElementRef,
    resetList,
    pagination,
  };
};
