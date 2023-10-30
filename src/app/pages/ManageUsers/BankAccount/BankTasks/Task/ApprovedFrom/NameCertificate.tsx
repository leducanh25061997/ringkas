import Grid from '@mui/material/Grid';
import { Controller, useFormContext } from 'react-hook-form';
import * as React from 'react';

const NameCertificate = () => {
  const { control } = useFormContext();

  return (
    <Grid
      sx={{ px: 4, py: 2, margin: '0', width: '100%' }}
      container
      spacing={2}
    >
      <Grid xs={5} md={3}>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mt-[10px]">
          Name on Certificate *
        </p>
      </Grid>
      <Grid xs={7} md={9} className="flex justify-between">
        <div className="w-[49%] flex-col">
          <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2 ">
            Full Name
          </p>
          <Controller
            name="certificateContact.nameOnCertificate"
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
        <div className="w-[49%] flex-col">
          <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2 ">
            Relationship Status
          </p>
          <Controller
            name="certificateContact.relationshipStatus"
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
      </Grid>
    </Grid>
  );
};

export default NameCertificate;
