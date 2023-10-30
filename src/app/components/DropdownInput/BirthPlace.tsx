import React, { useEffect, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import DropDownInput from '.';
import { DropdownItem } from './type';

interface Props {
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
  disabled?: boolean;
}
export default function BirthPlace(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get('/birth-places')
      .then(res =>
        setOptions(
          res.data.map((item: string) => ({
            label: item,
            value: item,
          })),
        ),
      )
      .finally(() => setIsLoading(false));
  }, []);

  return <DropDownInput options={options} isLoading={isLoading} {...props} />;
}

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  rules?: RegisterOptions;
  name: string;
}

export const ControlledBirthPlaceDropdown = (props: FieldProps & Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, name, rules, value, onChange, errorText, error, ...rest } =
    props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => (
        <BirthPlace
          {...rest}
          onBlur={(currentValue?: DropdownItem) => {
            if (!currentValue?.label?.trim()) {
              field.onChange();
              return;
            }
          }}
          error={!!fieldState.error}
          errorText={fieldState.error?.message}
          value={field.value}
          onChange={newValue => {
            field.onChange(newValue);
            onChange && onChange(newValue);
          }}
        />
      )}
    />
  );
};
