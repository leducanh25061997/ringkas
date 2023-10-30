/**
 *
 * RadioGroup
 *
 */
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  Typography,
} from '@mui/material';
import * as React from 'react';

interface SelectOption {
  value: number | string;
  label: string;
}

interface Props {
  title: string;
  options: SelectOption[];
  value?: any;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => void;
}

export const RadioGroup = React.forwardRef(
  ({ value, title, options, onChange }: Props, ref) => {
    return (
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '24px',
        }}
      >
        <Typography
          id="demo-controlled-radio-buttons-group"
          sx={{
            color: '#000000',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          {title}
        </Typography>
        <MuiRadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={onChange}
          row
          ref={ref}
        >
          {options.map((option: any) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              sx={{
                '.MuiFormControlLabel-label': {
                  color: '#6B7A99',
                  fontSize: '16px',
                  fontWeight: '500',
                },
              }}
              label={option.label}
            />
          ))}
        </MuiRadioGroup>
      </FormControl>
    );
  },
);
