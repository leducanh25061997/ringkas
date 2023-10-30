import React from 'react';
import PromotionItem from './PromotionItem';

import {
  Control,
  Controller,
  RegisterOptions,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { Promotions } from '../../slice/types';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: Promotions[];
  onChange?: (newValue?: Promotions[]) => void;
  required?: boolean;
  disabled?: boolean;
}

export default function Promotion(props: Props) {
  const { disabled } = props;
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'promotions',
  });

  return (
    <form>
      {fields &&
        fields.map((item: any, index: number) => {
          return (
            <PromotionItem
              key={index}
              index={index}
              remove={remove}
              disabled={disabled}
            />
          );
        })}

      {!disabled && (
        <div
          onClick={() => {
            append({
              promotionName: undefined,
              startDate: undefined,
              endDate: undefined,
            });
          }}
          className="text-[#005FC5] text-[16px] leading-[22px] border-2 border-dashed border-[#009CE0] rounded-[16px] mt-2 py-[17px] text-center cursor-pointer"
        >
          <span className="font-semibold">+</span>{' '}
          <span className="underline font-semibold">Add more</span>
        </div>
      )}
    </form>
  );
}

type FormValues = Record<string, Promotions[]>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  rules?: RegisterOptions;
  name: string;
}

export const ControlledPromotions = (props: FieldProps & Props) => {
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
          <Promotion
            {...rest}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            value={field.value}
            onChange={newValue => {
              field.onChange(newValue);
            }}
          />
        );
      }}
    />
  );
};
