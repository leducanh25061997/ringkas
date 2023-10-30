import React from 'react';
import { styled } from '@mui/material';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { DropItem } from 'app/components/Dropdown/types';
import Select from '@mui/material/Select';

const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    height: '62px!important',
  },
  '& .MuiOutlinedInput-root:hover': {
    fieldset: {
      borderColor: 'rgb(198, 215, 224)!important',
    },
  },
  '& .MuiFormControl-root': {
    width: '100%',
    margin: '0 0 24px 0',
  },
  '& .MuiFormLabel-root[data-shrink=true]': {
    color: '#000',
    top: '16px !important',
  },
  '& .MuiFormLabel-root[data-shrink=true].Mui-focused': {
    color: '#005FC5!important',
    top: '16px !important',
  },
  '& .MuiFormLabel-root[data-shrink=false]': {
    color: '#000',
    top: '8px !important',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    // border: '1px solid #005FC5!important',
    borderWidth: '1px!important',

    legend: {
      display: 'none!important',
    },
  },
  '& .MuiSelect-select': {
    borderColor: '#005FC5!important',
    padding: '25px 12px 8px 12px!important',
  },
});

type FormValues = Record<string, string>;

interface IconProps {
  src: string;
  width: number;
  height: number;
}

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value?: string) => void;
  label: string;
  icon?: IconProps;
  errorIcon?: IconProps;
  type?: string;
  disabled?: boolean;
  dropItems?: DropItem[];
}

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
}

export const ControlledDropdown = (props: FieldProps) => {
  const {
    control,
    name,
    rules,
    value,
    onChange,
    disabled,
    errorText,
    error,
    type,
    label,
    dropItems,
    ...rest
  } = props;

  return (
    <RootStyle>
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <FormControl
              sx={{ m: 1, minWidth: 200, background: '#f6f8fc' }}
              size="small"
            >
              <InputLabel id="demo-controlled-open-select-label">
                {label}
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-controlled-open-select"
                value={field.value}
                onChange={field.onChange}
                label={label}
                inputProps={{
                  disabled,
                }}
              >
                {dropItems &&
                  dropItems.map(item => (
                    <MenuItem value={item.value}>{item.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          );
        }}
      />
    </RootStyle>
  );
};
