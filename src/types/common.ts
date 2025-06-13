import { FileWithPath } from "@mantine/dropzone";

export type TError = {
  [key: string]: string | undefined;
  data?: (Record<string, string | undefined> & { toastMessage?: string }) | any;
};

export type TForm = {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | { key: string; value: string }[]
    | FileWithPath[]
    | null
    | undefined;
};

export type TFormUpdateValue =
  | string
  | number
  | boolean
  | null
  | string[]
  | number[]
  | undefined;

export type TFormValidator = {
  field_name: string;
  notValid?: string | null;
  required?: boolean;
  visible?: boolean;
  props?: any;
  value?: any;
};

export type TSetError = (errors: TError) => void;

export type TFormHandlerParams = {
  source_id: string;
  id?: string;
  draft_id?: string;
  form_params?: any;
};

export type TGeneralHookParams = {
  status?: string;
  id: string;
};
