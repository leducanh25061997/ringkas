import React, { useEffect, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import DropDownInput from '.';
import { DropdownItem } from './type';

interface Props {
  province?: string;
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: DropdownItem;
  onChange?: (newValue?: DropdownItem) => void;
  onBlur?: (currentValue?: DropdownItem) => void;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}
export default function Cities(props: Props) {
  const { province, disabled, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (!province) {
      axiosClient
        .get(`/cities`)
        .then(res =>
          setOptions(
            res.data.map((item: string) => ({
              label: item,
              value: item,
            })),
          ),
        )
        .finally(() => setIsLoading(false));
      return;
    }

    axiosClient
      .get(`/province/${province}/cities`)
      .then(res =>
        setOptions(
          res.data.map((item: string) => ({
            label: item,
            value: item,
          })),
        ),
      )
      .finally(() => setIsLoading(false));
  }, [province]);
  return (
    <DropDownInput
      options={options}
      disabled={disabled}
      isLoading={isLoading}
      {...rest}
    />
  );
}

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  rules?: RegisterOptions;
  name: string;
}

export const ControlledCityDropdown = (props: FieldProps & Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    name,
    rules,
    value,
    onChange,
    disabled,
    errorText,
    error,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Cities
            {...rest}
            onBlur={(currentValue?: DropdownItem) => {
              if (!currentValue?.label?.trim()) {
                field.onChange();
                return;
              }
            }}
            disabled={disabled}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            value={value ? value : field.value}
            onChange={newValue => {
              field.onChange(newValue);
              onChange && onChange(newValue);
            }}
          />
        );
      }}
    />
  );
};
