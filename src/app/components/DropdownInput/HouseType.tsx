import React, { useEffect, useRef, useState } from 'react';
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
  required?: boolean;
  disabled?: boolean;
  projectId?: number;
}

export default function HouseType(props: Props) {
  const { disabled, projectId, onChange, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<DropdownItem[]>([]);
  const idRef = useRef<number>();

  useEffect(() => {
    if (idRef.current) {
      onChange && onChange(undefined);
    }
    idRef.current = projectId;
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    setIsLoading(true);
    axiosClient
      .get(`console/project/${projectId}`)
      .then(res => {
        if (!res.data.houseTypes) {
          setOptions([]);
        } else {
          setOptions(
            res.data.houseTypes.map((item: string) => ({
              label: item,
              value: item,
            })),
          );
        }
      })
      .finally(() => setIsLoading(false));
  }, [projectId]);

  return (
    <DropDownInput
      options={options}
      isLoading={isLoading}
      {...rest}
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

export const ControlledHouseTypeDropdown = (props: FieldProps & Props) => {
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
          <HouseType
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
        );
      }}
    />
  );
};
