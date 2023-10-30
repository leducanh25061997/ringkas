import React from 'react';
import { Grid, Stack, styled } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { ControlledImageUpload } from 'app/components/ImageUpload';

const RenderInput = styled('div')({
  background: '#F6F8FC',
  borderRadius: '10px',
  border: '1px solid #C6D7E0',
  '& .MuiFormControl-root': {
    width: '100%',
    '& input': {
      // padding: '5px 13px',
    },
    '& input:focus': {
      boxShadow: 'none',
      color: 'black',
    },
    '& .MuiFilledInput-root:before': {
      right: 'unset',
      content: '""',
    },
    '& .MuiFilledInput-root:after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .Mui-disabled': {
      background: '#E8E8E8',
      borderRadius: '10px',
    },
    '& .MuiInputLabel-root': {
      color: '#000000',
    },
    '& .MuiInputLabel-root:focus': {
      color: '#000000',
      background: '#FFFFFF',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'red !important',
    fontSize: '14px',
  },
});

const RenderImage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10px',
  '& img': {
    width: '100%',
  },
});

interface Props {
  formData: any;
  setFormData: (value: any) => void;
  images: any;
  setImages: (value: any) => void;
}

const SecondPicData = (props: Props) => {
  const { images, setImages, formData, setFormData } = props;
  const {
    control,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const onChangeDob = (event: any) => {
    if (event && event.toString() !== 'Invalid Date') {
      setFormData({
        ...formData,
        dob: event,
      });
      clearErrors('dob');
    } else {
      setFormData({
        ...formData,
        dob: '',
      });
      setError('dob', {
        message: 'Invalid Date',
      });
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" mt={1}>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledTextField
            className="field"
            type="id"
            label="NIK"
            name="nik"
            required
            value={formData.nik}
            control={control}
            rules={{
              required: 'Required',
            }}
            onChange={e => {
              setFormData({
                ...formData,
                nik: e,
              });
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledDatePicker
            control={control}
            name="dob"
            label="Date of birth*"
            className="field"
            onChange={onChangeDob}
            disableFuture
            rules={{
              required: 'Required',
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack>
          <ControlledImageUpload
            name="fileKtp"
            control={control}
            label="File KTP"
            onChange={e => {
              setFormData({
                ...formData,
                photoKtp: { url: 'photoKyp.png' },
              });
            }}
            className="field"
            rules={{
              required: 'Required',
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SecondPicData;
