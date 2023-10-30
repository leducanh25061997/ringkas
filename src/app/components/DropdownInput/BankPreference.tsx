import React, { useEffect, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import DropDownInput from '.';
import { DropdownItem } from './type';
import { BankAccountData } from 'types/BankAccountManagement';

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
  required?: boolean;
  disabled?: boolean;
  listBank?: string[];
}

export default function Banks(props: Props) {
  const { disabled, value, onChange, name, listBank, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/console/banks?size=1000&page=0`)
      .then(res => {
        const newData: any[] = [];
        res.data.data.map((item: BankAccountData) => {
          if (
            item.bankName &&
            listBank &&
            listBank.indexOf(item.bankName) > -1
          ) {
          } else {
            item.bankName &&
              newData.push({
                label: item.bankName,
                value: item.userUuid,
                file: item.fileLogo && item.fileLogo[0].url,
              });
          }
        });
        setOptions(newData);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <DropDownInput
      options={options}
      isLoading={isLoading}
      {...rest}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  rules?: RegisterOptions;
  name: string;
}

export const ControlledBankPreferencesDropdown = (
  props: FieldProps & Props,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    name,
    rules,
    onChange,
    listBank,
    value,
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
          <Banks
            {...rest}
            onBlur={(currentValue?: DropdownItem) => {
              if (!currentValue?.label?.trim()) {
                field.onChange();
              }
            }}
            onChange={newValue => {
              field.onChange(newValue);
              onChange && onChange(newValue);
            }}
            name={name}
            listBank={listBank}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            value={value ? value : field.value}
          />
        );
      }}
    />
  );
};
