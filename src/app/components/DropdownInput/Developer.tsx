import React, { useEffect, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import DropDownInput from '.';
import { DropdownItem } from './type';
import { ProjectManagement } from 'types/ProjectManagement';
import { EmployeeAccountData } from 'types/EmployeeAccountManagement';
import {
  DeveloperAccountForm,
  DeveloperAccountList,
} from 'types/DeveloperAccountManagement';

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
}
export default function Projects(props: Props) {
  const { disabled, value, name, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get(`/console/partners?size=50&page=0`)
      .then(res => {
        setOptions(
          res.data.data.map((item: DeveloperAccountList) => ({
            label: item.kyc.fullName,
            value: item.userUuid,
          })),
        );
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <DropDownInput
      options={options}
      isLoading={isLoading}
      {...rest}
      value={value}
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

export const ControlledDevelopersDropdown = (props: FieldProps & Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, name, rules, value, onChange, errorText, error, ...rest } =
    props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Projects
            {...rest}
            onBlur={(currentValue?: DropdownItem) => {
              if (!currentValue?.label?.trim()) {
                field.onChange();
                return;
              }
            }}
            name={name}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            value={field.value}
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
