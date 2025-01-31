export type TError = {
    [key: string]: string | undefined;
    data?: (Record<string, string | undefined> & { toastMessage?: string }) | any;
  };