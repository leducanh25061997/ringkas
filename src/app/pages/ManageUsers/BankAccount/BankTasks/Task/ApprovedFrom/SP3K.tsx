import Grid from '@mui/material/Grid';
import { Controller, useFormContext } from 'react-hook-form';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { INT_NUMBER, numberRegex } from 'utils/helpers/regex';
import { fileService } from 'services';
import React, { useState } from 'react';
import Spinner from 'app/components/Spinner';
import moment from 'moment';
import useUpdateEffect from 'app/hooks/useUpdateEffect';

const SP3K = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, watch, trigger } = useFormContext();

  const releaseDate = watch('releaseDate');
  const expirationDate = watch('expirationDate');

  useUpdateEffect(() => {
    trigger('releaseDate');
  }, [releaseDate, expirationDate]);

  useUpdateEffect(() => {
    trigger('expirationDate');
  }, [releaseDate, expirationDate]);

  return (
    <Grid
      sx={{ px: 4, py: 2, margin: '0', width: '100%' }}
      container
      spacing={2}
    >
      <Grid xs={5} md={3}>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium">
          SP3K *
        </p>
      </Grid>
      <Grid xs={7} md={9}>
        <Controller
          name="sp3k.documents"
          rules={{
            required: 'Please fill this field',
          }}
          control={control}
          render={({ field, fieldState }) => {
            const handleClickUpload = () => {
              const input = document.createElement('input');
              input.type = 'file';
              input.setAttribute('accept', '.pdf');
              input.click();
              input.remove();

              input.onchange = e => {
                const elm = e.target as HTMLInputElement;
                if (!elm.files) return;
                const file = elm.files[0];
                const fileName = [file.name];

                setIsLoading(true);
                fileService
                  .fetchUrlImages({ fileName })
                  .then(res => {
                    fileService
                      .getUrlImageData([
                        { url: res[0].url as string, files: file },
                      ])
                      .then(() => {
                        field.onChange && field.onChange({ ...res[0], file });
                        setIsLoading(false);
                      })
                      .catch(err => {
                        setIsLoading(false);
                        field.onChange && field.onChange(undefined);
                      });
                  })
                  .catch(err => {
                    setIsLoading(false);
                  });
              };
            };

            return (
              <div className="mb-6">
                {isLoading && (
                  <div className="spinner mb-4">
                    <Spinner />
                  </div>
                )}
                {!field.value ? (
                  <p
                    className="text-[#005FC5] underline text-[16px] leading-[22px] font-semibold cursor-pointer"
                    onClick={handleClickUpload}
                  >
                    Upload Doc *
                  </p>
                ) : (
                  <p
                    className="text-[#005FC5] underline text-[16px] leading-[22px] font-semibold cursor-pointer"
                    onClick={handleClickUpload}
                  >
                    {field.value.file.name}
                  </p>
                )}

                {fieldState.error && (
                  <p className="mt-2 text-[#FF0000]">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2">
          Doc. Number *
        </p>
        <Controller
          name="sp3k.docNumber"
          rules={{
            required: 'Please fill this field',
            pattern: {
              value: numberRegex,
              message: 'Only accept number',
            },
          }}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <input
                  value={field.value || ''}
                  onChange={e => {
                    const { value } = e.target;
                    if (INT_NUMBER.test(value)) field.onChange(value);
                  }}
                  className="border border-[#D7E2EE] rounded-xl py-[10px] px-[14px] w-full"
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
        <div className="mt-4 flex">
          <div className="mr-10">
            <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2">
              Expiration Date *
            </p>
            <ControlledDatePicker
              name="sp3k.expirationDate"
              label="Expiration Date"
              control={control}
              className="w-[200px]"
              isNotLabel
              rules={{
                required: 'Please fill this field',
                validate: value => {
                  const isValidDate =
                    value instanceof Date && !isNaN(value.getTime());
                  if (
                    !isValidDate ||
                    moment(value).isBefore(releaseDate, 'date')
                  )
                    return 'Invalid Date';
                  return true;
                },
              }}
            />
          </div>
          <div>
            <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2">
              Release Date *
            </p>
            <span>-</span>
            {/* <ControlledDatePicker
              name="releaseDate"
              label="Release Date"
              control={control}
              className="w-[200px]"
              isNotLabel
              rules={{
                required: 'Please fill this field',
                validate: value => {
                  const isValidDate =
                    value instanceof Date && !isNaN(value.getTime());
                  if (
                    !isValidDate ||
                    moment(value).isAfter(expirationDate, 'date')
                  )
                    return 'Invalid Date';
                  return true;
                },
              }}
            /> */}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SP3K;
