import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/lab';
import { TextField } from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import styled from 'styled-components';
import moment from 'moment';

const RootContainer = styled.div`
  &.notLabel {
    label {
      display: none;
    }
    input {
      margin-top: -24px;
      padding-right: 0px;
      padding-left: 10px;
    }
  }

  //.Mui-disabled {
  //  -webkit-text-fill-color: #000 !important;
  //}

  &.error {
    .MuiInputLabel-root {
      color: red !important;
    }
    .MuiFilledInput-root {
      border-color: red !important;
    }
  }

  .MuiInputAdornment-root {
    margin-right: 10px;
  }

  .MuiInputBase-input {
    padding: 30px 20px 8px 20px;
  }
  .MuiInputLabel-root {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: unset;
    top: 5px;
    left: 7px;
    color: #9098a7;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    &.MuiInputLabel-shrink {
      color: #000000;
      transform: translate(12px, 5px);
      font-size: 12px;
      line-height: 24px;
    }

    &.Mui-focused {
      transform: translate(12px, 5px);
      color: #005fc5;
      font-size: 12px;
      line-height: 24px;
    }
  }

  .MuiFilledInput-root {
    border: 1px solid rgb(198, 215, 224);
    border-radius: 8px;
    background-color: #fff;
    &:hover {
      background-color: white;
    }
    &.Mui-focused {
      border-color: #005fc5;
      background-color: white;
    }
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }
`;

const Error = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  color: #ff0000;
`;

type Props = Omit<DatePickerProps, 'renderInput'> & {
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  isOptional?: boolean;
  isNotLabel?: boolean;
  isBg?: boolean;
};

export default function DatePicker(props: Props) {
  const {
    error,
    inputFormat,
    value,
    className,
    errorText,
    disabled,
    isNotLabel,
    isBg,
    ...rest
  } = props;
  return (
    <RootContainer
      className={classNames(className, {
        error,
        notLabel: isNotLabel,
        isBg,
      })}
    >
      <MuiDatePicker
        {...rest}
        value={value}
        inputFormat="dd/MM/yyyy"
        disabled={disabled}
        renderInput={params => {
          const { fullWidth, autoComplete, variant, ...rest } = params;
          return (
            <TextField
              {...rest}
              fullWidth
              variant="filled"
              autoComplete="off"
              sx={{
                '.MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000',
                },
                '.MuiFilledInput-root.Mui-disabled:hover': {
                  background: '#DFE3E8',
                },
                '.MuiInputLabel-root.Mui-disabled': {
                  WebkitTextFillColor: '#005FC5',
                },
              }}
            />
          );
        }}
      />
      {error && <Error>{errorText}</Error>}
    </RootContainer>
  );
}

type FormValues = Record<string, Date>;

interface FieldProps {
  control: Control<FormValues>;
  name: string;
  label: string;
  className?: string;
  rules?: RegisterOptions;
  disableFuture?: boolean;
  onChange?: (e: Date) => void;
  disabled?: boolean;
  isNotLabel?: boolean;
  isBg?: boolean;
  defaultValue?: string;
}
export const ControlledDatePicker = (props: FieldProps) => {
  const {
    control,
    name,
    label,
    onChange,
    rules,
    className,
    disableFuture,
    disabled,
    isNotLabel,
    isBg,
    defaultValue,
  } = props;

  return (
    <Controller
      name={name}
      rules={{
        validate: value => {
          const isValidDate = value instanceof Date && !isNaN(value.getTime());
          if (!isValidDate) return 'Invalid Date';
          if (disableFuture)
            return !moment(value).isAfter(new Date()) || 'Invalid Date';
          return true;
        },
        ...rules,
      }}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <DatePicker
            className={className}
            label={label}
            errorText={fieldState.error?.message}
            value={field.value || defaultValue || null}
            onChange={date => {
              field.onChange(date);
              onChange && onChange(date as Date);
            }}
            error={fieldState.invalid}
            disableFuture={disableFuture}
            disabled={disabled}
            isNotLabel={isNotLabel}
            isBg={isBg}
          />
        );
      }}
    />
  );
};
