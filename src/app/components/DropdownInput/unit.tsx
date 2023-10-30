import React, { useEffect, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import DropDownInput from '.';
import { DropdownItem } from './type';

interface Props {
  projectType: string;
  projectId: number;
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
export default function Units(props: Props) {
  const { projectId, disabled, projectType, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    if (!projectType || !projectId) {
      setOptions([]);
      return;
    }
    setIsLoading(true);

    axiosClient
      .get('/console/properties', {
        params: {
          projectId,
          type: projectType,
        },
      })
      .then(res => {
        const newData: any[] = [];
        res.data.data.map((item: any) => {
          item.unit &&
            newData.push({
              label: item.unit,
              value: item.id,
              price: item.pricing.housePrice,
            });
          setOptions(newData);
        });
      })
      .finally(() => setIsLoading(false));
  }, [projectType, projectId]);
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

export const ControlledUnitDropdown = (props: FieldProps & Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    disabled,
    name,
    rules,
    value,
    onChange,
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
          <Units
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
            disabled={disabled}
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
