import Grid from '@mui/material/Grid';
import { Controller, useFormContext } from 'react-hook-form';
import * as React from 'react';
import { EMAIL_REGEX, PHONE_REGEX } from 'utils/helpers/regex';

const NotaryPic = () => {
  const { control } = useFormContext();

  return (
    <Grid
      sx={{ px: 4, py: 2, margin: '0', width: '100%' }}
      container
      spacing={2}
    >
      <Grid xs={5} md={3}>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mt-[10px]">
          Notary PIC *
        </p>
      </Grid>
      <Grid xs={7} md={9} className="flex-col">
        <div className="flex justify-between mb-4">
          <div className="flex-col w-[49%]">
            <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2 ">
              Name
            </p>
            <Controller
              name="notaryPIC.notaryName"
              rules={{
                required: 'Please fill this field',
              }}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <input
                      value={field.value || ''}
                      onChange={field.onChange}
                      className="border border-[#D7E2EE] rounded-xl py-[10px] px-[16px] w-full"
                      placeholder="Input text"
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-[#FF0000]">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className="flex-col w-[49%]">
            <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2 ">
              Phone number
            </p>
            <Controller
              name="notaryPIC.notaryPhoneNumber"
              rules={{
                required: 'Please fill this field',
              }}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <input
                      value={field.value || ''}
                      onChange={e => {
                        const { value } = e.target;
                        if (PHONE_REGEX.test(value)) field.onChange(value);
                      }}
                      className="border border-[#D7E2EE] rounded-xl py-[10px] px-[16px] w-full"
                      placeholder="Input text"
                    />
                    {fieldState.error && (
                      <p className="mt-2 text-[#FF0000]">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="flex-col w-[49%] justify-between">
          <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2 ">
            Email
          </p>
          <Controller
            name="notaryPIC.notaryEmail"
            rules={{
              required: 'Please fill this field',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Incorrect format',
              },
            }}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <>
                  <input
                    value={field.value || ''}
                    onChange={field.onChange}
                    className="border border-[#D7E2EE] rounded-xl py-[10px] px-[16px] w-full"
                    placeholder="Input text"
                  />
                  {fieldState.error && (
                    <p className="mt-2 text-[#FF0000]">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              );
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default NotaryPic;
