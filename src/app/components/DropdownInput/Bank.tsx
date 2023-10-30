import { FormControl, Select, MenuItem } from '@mui/material';
import { set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import DropDownInput from '.';
import { DropdownItem } from './type';

interface Props {
  className?: string;
  // name?: string;
  // error?: boolean;
  // errorText?: string;
  // placeholder?: string;
  // value?: DropdownItem;
  onChange?: (newValue?: any) => void;
  // onBlur?: (currentValue?: DropdownItem) => void;
  // label: string;
  // type?: string;
  required?: boolean;
  disabled?: boolean;
  options: any[];
}

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control?: Control<FormValues>;
  rules?: RegisterOptions;
  name: string;
}

export const ControlledBankDropdown = (props: FieldProps & Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    name,
    rules,
    // value,
    onChange,
    // errorText,
    // error,
    options,
    ...rest
  } = props;
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => {
        return (
          <FormControl
            sx={{ m: 1, minWidth: 200, background: '#f6f8fc' }}
            size="small"
            fullWidth
          >
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-controlled-open-select"
              value={field.value || ''}
              onChange={e => {
                field.onChange(e.target.value);
              }}
            >
              {options.map(item => {
                return (
                  <MenuItem value={item.userUuid} key={item.userUuid}>
                    <div className="flex w-full p-1 items-center">
                      <div>
                        {item.fileLogo?.url}
                        <img
                          src={item.fileLogo[0]?.url}
                          width={30}
                          height={30}
                          alt={''}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ marginLeft: 4 }}>
                        <p className="normal-case">Bank name</p>
                        <p className="normal-case">{item.bankName}</p>
                      </div>
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};
