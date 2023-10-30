import React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { get, set } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  Controller,
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import UploadIcon from 'assets/icons/upload.svg';
import UploadImg from 'assets/images/upload.svg';
import { translations } from 'locales/translations';
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
  Grid,
} from '@mui/material';

interface Props {
  images: any;
  errors: any;
  setImages: any;
  control: any;
  name: string;
  path: string;
  label: string;
  acceptFile: string;
  uploadVideo?: boolean;
  isFlex?: boolean;
  isBackgroundWhite?: boolean;
  titleMaxSize: string;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

const ImgUpload = styled('div')({
  borderRadius: '50%',
  width: '85px',
  height: '85px',
  background: '#005FC5',
  textAlign: 'center',
  // marginRight: 'auto',
  // marginLeft: 'auto',
});

export default function UploadFile(props: Props) {
  const {
    errors,
    images,
    setImages,
    control,
    name,
    path,
    label,
    acceptFile,
    uploadVideo,
    isFlex,
    isBackgroundWhite,
    titleMaxSize,
    clearErrors,
    setError,
  } = props;
  const { t } = useTranslation();
  const [imageData, setImageData] = React.useState(get(images, path));

  React.useEffect(() => {
    setImageData(get(images, path));
  }, [images]);

  const handleOnChange = (event: any, field: any) => {
    if (uploadVideo && event.target.files[0].size > 51200000) {
      setError(name, {
        message: 'Incorrect document format',
      });
      return;
    }
    if (!uploadVideo && event.target.files[0].size > 5120000) {
      setError(name, {
        message: 'Incorrect document format',
      });
      return;
    }
    if (event.target.files.length !== 0) {
      const newData = { ...images };
      set(newData, `${path}.url`, URL.createObjectURL(event.target.files[0]));
      set(newData, `${path}.file`, event.target.files[0]);
      set(newData, `${path}.name`, name);
      set(newData, `${path}.nameFile`, event.target.files[0].name);
      setImages(newData);
      field.onChange(event.target.files[0].name);
      clearErrors(name);
    }
  };

  return (
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
              inputProps={{ accept: acceptFile }}
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
              bgcolor:
                imageData?.url || isBackgroundWhite ? 'white' : '#F6F8FC',
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
                style={{
                  margin: 'auto',
                  paddingTop: '30px',
                  width: '50px',
                  height: '160px',
                  objectFit: 'cover',
                }}
                src={imageData?.url}
                alt="Upload-Images"
              />
            ) : (
              <Grid
                container
                sx={isFlex ? { marginBottom: '0px' } : { marginBottom: '10px' }}
              >
                <Grid
                  item
                  md={isFlex ? 12 : 6}
                  display="flex"
                  justifyContent="center"
                >
                  <ImgUpload>
                    <img
                      src={UploadIcon}
                      style={{
                        paddingTop: '30px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                      alt="Upload-Images"
                    />
                  </ImgUpload>
                </Grid>
                <Grid
                  item
                  md={isFlex ? 12 : 6}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  sx={isFlex ? { mt: 2 } : { mt: 1 }}
                >
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: '#223250',
                      textAlign: isFlex ? 'center' : '',
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{ color: '#979797', textAlign: isFlex ? 'center' : '' }}
                  >
                    {titleMaxSize}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </div>
        ) : (
          <div>
            {uploadVideo ? (
              <video
                className="VideoInput_video"
                width="100%"
                height="400px"
                controls
                src={imageData?.url}
              />
            ) : (
              <CardMedia
                component="img"
                alt="green iguana"
                height="160"
                image={imageData?.url}
                sx={
                  imageData?.url
                    ? {
                        marginTop: '-40px',
                        borderRadius: '8px',
                        height: '180px',
                        objectFit: 'cover',
                      }
                    : { ':hover': { cursor: 'pointer', marginTop: '-40px' } }
                }
              />
            )}
          </div>
        )}
      </label>
    </div>
  );
}
