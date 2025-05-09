import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'
import { Select, Loader } from '@mantine/core'
import useGet from '@/utils/useGet';
import { returnObject } from '@/utils/helpers';

const Search = ({ type, wide }: { type?: 'projects' | 'apps' | 'users' | 'tags', wide?: boolean }) => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const { data: searchData, getData: getSearchData, loading } = useGet();

    // Extracted debounce logic
    const debouncedSearch = useDebounce(searchValue, 300);

    useEffect(() => {
        if (debouncedSearch.trim()) {
            getSearchData({
                api: `/search`,
                params: {
                    keywords: debouncedSearch,
                    type,
                },
            });
        }
    }, [debouncedSearch]);

    // Extracted option generators
    const generateOptions = (type: string, items: any[] = []) => {
        const typeMap = {
            projects: { group: 'Projects', path: (item: any) => `/projects/${item.id}` },
            apps: { group: 'Apps', path: (item: any) => `/projects/${item.project_id}/apps/${item.id}` },
            users: { group: 'Users', path: () => { } }
        };

        return returnObject(items.length > 0, [{
            group: typeMap[type as keyof typeof typeMap].group,
            items: items.map((item: any) => ({
                label: item.name,
                value: item.id,
                original: item,
                type
            }))
        }]);
    };

    // Simplified search options construction
    const searchOptions = [
        ...generateOptions('projects', searchData?.data?.projects?.items || []),
        ...generateOptions('apps', searchData?.data?.apps?.items || []),
        ...generateOptions('users', searchData?.data?.users?.items || [])
    ].filter(Boolean);

    // Extracted navigation handler
    const handleNavigation = (option: any) => {
        const navigators = {
            projects: () => navigate(`/projects/${option.original.id}`),
            apps: () => navigate(`/projects/${option.original.project_id}/apps/${option.original.id}`),
            users: () => { }
        };
        navigators[option.type as keyof typeof navigators]?.();
        setSearchValue('');
    };

    return (
        <Select
            placeholder="Search..."
            radius="md"
            leftSection={<FiSearch />}
            miw={{ base: "auto", sm: 300 }}
            style={wide ? { flex: 1 } : {}}
            display={{ base: "none", sm: "block" }}
            data={searchOptions}
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            searchable
            clearable
            nothingFoundMessage="No results found"
            onChange={(_value, option) => handleNavigation(option)}
            rightSection={loading ? <Loader size="xs" /> : null}
        />
    );
};

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

export default Search