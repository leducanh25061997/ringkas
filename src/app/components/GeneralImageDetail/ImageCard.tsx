import {
  TextField,
  CardActionArea,
  CardMedia,
  IconButton,
  FormHelperText,
  Stack,
  Card,
  Typography,
  styled,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import {
  Controller,
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { get, set } from 'lodash';
import { useEffect, useState } from 'react';
import { translations } from 'locales/translations';
import UploadIcon from 'assets/icons/upload.svg';
import UploadImg from 'assets/images/upload.svg';

const ImgUpload = styled('div')({
  borderRadius: '50%',
  width: '85px',
  height: '85px',
  background: '#005FC5',
  marginRight: 'auto',
  marginLeft: 'auto',
});

interface Props {
  images: any;
  errors: any;
  setImages: any;
  control: any;
  name: string;
  path: string;
  label: string;
  extra?: any;
  isFlex?: boolean;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

export const ImageCard = (props: Props) => {
  const {
    errors,
    images,
    setImages,
    control,
    name,
    path,
    label,
    extra,
    isFlex,
    setError,
    clearErrors,
  } = props;
  const { t } = useTranslation();
  const [imageData, setImageData] = useState(get(images, path));

  useEffect(() => {
    setImageData(get(images, path));
  }, [images]);

  const handleOnChange = (event: any, field: any) => {
    if (event.target.files[0].size <= 5120000) {
      if (event.target.files.length !== 0) {
        const newData = { ...images };
        set(newData, `${path}.url`, URL.createObjectURL(event.target.files[0]));
        set(newData, `${path}.file`, event.target.files[0]);
        set(newData, `${path}.name`, name);
        set(newData, `${path}.nameFile`, event.target.files[0].name);
        setImages(newData);
        field.onChange(event);
      }
      clearErrors(name);
    } else {
      setError(name, {
        message: 'Incorrect document format',
      });
    }
  };
  return isFlex ? (
    <div>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <TextField
              id={name}
              sx={{ display: 'none' }}
              {...field}
              type="file"
              value={get(imageData, `${path}.url`)}
              inputProps={{ accept: 'image/*' }}
              onChange={(e: any) => {
                handleOnChange(e, field);
              }}
            />
          );
        }}
        control={control}
      />
      <label htmlFor={name}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            sx={{
              position: 'relative',
              bgcolor: 'white',
            }}
            component="span"
            children={imageData?.url ? <CameraAltIcon /> : <div />}
          />
        </Stack>
      </label>
      <label htmlFor={!imageData?.url ? name : undefined}>
        {!imageData?.url ? (
          <div
            style={{
              height: '160px',
              objectFit: 'cover',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {imageData?.url ? (
              <img
                style={{ margin: 'auto', paddingTop: '30px', width: '50px' }}
                src={imageData?.url}
                alt={'upload'}
              />
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                <ImgUpload>
                  <img
                    src={UploadIcon}
                    style={{
                      paddingTop: '25px',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                    alt={'upload'}
                  />
                </ImgUpload>
                <div
                  style={
                    imageData?.url
                      ? { display: 'none' }
                      : {
                          margin: '1rem',
                          textAlign: 'center',
                          color: '#637381',
                          alignSelf: 'center',
                        }
                  }
                >
                  <Typography sx={{ fontSize: '16px', color: '#223250' }}>
                    {label}
                  </Typography>
                  <Typography sx={{ color: '#979797' }}>
                    {t(translations.developerInformation.maxSize)}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CardMedia
            component="img"
            alt="green iguana"
            height="176"
            image={imageData?.url}
            sx={
              imageData?.url
                ? { marginTop: '-40px', height: '176px', objectFit: 'cover' }
                : { ':hover': { cursor: 'pointer', marginTop: '-40px' } }
            }
          />
        )}
      </label>
      {get(errors, path) && (
        <FormHelperText sx={{ color: 'red', textAlign: 'center' }}>
          {get(errors, `${path}.message`)}
        </FormHelperText>
      )}
    </div>
  ) : (
    <div>
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <TextField
              id={name}
              sx={{ display: 'none' }}
              {...field}
              type="file"
              value={get(imageData, `${path}.url`)}
              inputProps={{ accept: 'image/*' }}
              onChange={(e: any) => {
                handleOnChange(e, field);
              }}
            />
          );
        }}
        control={control}
      />
      <label htmlFor={name}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            sx={{
              position: 'relative',
              bgcolor: 'white',
            }}
            component="span"
            children={imageData?.url ? <CameraAltIcon /> : <div />}
          />
        </Stack>
      </label>
      <label htmlFor={!imageData?.url ? name : undefined}>
        {!imageData?.url ? (
          <div
            style={{
              height: '160px',
              objectFit: 'cover',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {imageData?.url ? (
              <img
                style={{ margin: 'auto', paddingTop: '30px', width: '50px' }}
                src={imageData?.url}
              />
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                }}
              >
                <div style={{ marginTop: '100px' }}>
                  <img src={UploadImg} />
                </div>
                <div
                  style={
                    imageData?.url
                      ? { display: 'none' }
                      : {
                          marginTop: '-1rem',
                          textAlign: 'center',
                          color: '#637381',
                          alignSelf: 'center',
                        }
                  }
                >
                  <Typography sx={{ fontSize: '16px', color: '#223250' }}>
                    {label}
                  </Typography>
                  <Typography sx={{ color: '#979797' }}>
                    {t(translations.developerInformation.maxSize)}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CardMedia
            component="img"
            alt="green iguana"
            height="160"
            image={imageData?.url}
            sx={
              imageData?.url
                ? { marginTop: '-40px', height: '180px', objectFit: 'cover' }
                : { ':hover': { cursor: 'pointer', marginTop: '-40px' } }
            }
          />
        )}
      </label>
      {get(errors, path) && (
        <FormHelperText sx={{ color: 'red', textAlign: 'center' }}>
          {get(errors, `${path}.message`)}
        </FormHelperText>
      )}
    </div>
  );
};
