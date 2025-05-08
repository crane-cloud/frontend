import { useState, ChangeEvent } from "react";
import {
  TForm,
  TFormValidator,
  TSetError,
  TFormUpdateValue,
  TError,
} from "../types/common";

const useForm = () => {
  const [form, setForm] = useState<TForm>({});
  const [editedForm, setEditedForm] = useState<any>({});
  const updateFormValue = (key: string, value: TFormUpdateValue) => {
    setForm({
      ...form,
      [key]: value === undefined ? null : value,
    });
    setEditedForm({
      ...editedForm,
      [key]: value === undefined ? null : value,
    });
  };

  const updateFormValues = (obj: Partial<TForm>) => {
    setForm({
      ...form,
      ...obj,
    });
  };

  const validateForm = (
    validators: TFormValidator[],
    setError: TSetError,
  ): boolean => {
    let errors: TError = {};
    let isValid = true;
    validators.forEach(
      ({ notValid, field_name, props, value, visible = true }) => {
        if (notValid) {
          errors = {
            ...(errors || {}),
            [field_name]: notValid,
          };
          isValid = false;
        }

        if (
          props?.required &&
          (form[field_name] === undefined ||
            form[field_name] === null ||
            form[field_name] === "") &&
          visible &&
          !value &&
          !props?.parent_field
        ) {
          errors = {
            ...(errors || {}),
            [field_name]: "This field is required",
          };
          isValid = false;
        }
      },
    );

    Object.keys(errors).length > 0 &&
      setError({ ...errors, toastMessage: "Missing required fields" });
    return isValid;
  };

  const onChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    updateFormValue(name, value === undefined ? null : value);
  };

  return {
    form,
    editedForm,
    setForm,
    updateFormValue,
    updateFormValues,
    validateForm,
    onChange,
  };
};

export default useForm;
