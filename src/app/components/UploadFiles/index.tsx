import React from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { get, set } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import UploadIcon from 'assets/icons/upload.svg';
import Notifier from 'app/pages/Notifier';
import { translations } from 'locales/translations';
import {
  TextField,
  CardMedia,
  IconButton,
  FormHelperText,
  Stack,
  Typography,
  styled,
  Grid,
} from '@mui/material';
import {
  ImageFiles,
  Images,
} from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
interface Props {
  images: Images;
  setImages: (value: Images) => void;
  errors: any;
  control: any;
  name: string;
  path: string;
  label: string;
  acceptFile: string;
  uploadVideo?: boolean;
  parentName: string;
  indexImage: number;
  image?: ImageFiles;
  setValue?: any;
  errorsImage: string[];
  setErrorsImage: (value: string[]) => void;
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

export default function UploadFiles(props: Props) {
  const {
    errors,
    image,
    images,
    setImages,
    control,
    name,
    label,
    acceptFile,
    parentName,
    indexImage,
    setValue,
    setErrorsImage,
    errorsImage,
  } = props;
  const { t } = useTranslation();

  const handleOnChange = (event: any, field: any) => {
    if (event.target.files[0].size <= 5120000) {
      if (event.target.files.length !== 0) {
        const newData = { ...images };
        if (newData.uploadPhoto[indexImage].url) {
          newData.uploadPhoto.splice(indexImage, 1);
          newData.uploadPhoto.splice(indexImage, 0, {
            url: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
            name: parentName,
            nameFile: event.target.files[0].name,
          });
          const datas = [...errorsImage];
          datas.splice(indexImage, 1, '');
          setErrorsImage(datas);
        } else {
          if (newData.uploadPhoto.length <= 9) {
            newData.uploadPhoto.splice(indexImage, 0, {
              url: URL.createObjectURL(event.target.files[0]),
              file: event.target.files[0],
              name: parentName,
              nameFile: event.target.files[0].name,
            });
          } else {
            newData.uploadPhoto.splice(indexImage, 1, {
              url: URL.createObjectURL(event.target.files[0]),
              file: event.target.files[0],
              name: parentName,
              nameFile: event.target.files[0].name,
            });
          }
          const datas = [...errorsImage];
          datas.splice(indexImage, 1, '');
          setErrorsImage(datas);
        }
        setValue('uploadPhoto', newData.uploadPhoto, { shouldValidate: true });
        setImages(newData);
      }
    } else {
      const datas = [...errorsImage];
      datas.splice(indexImage, 1, 'Incorrect document format');
      setErrorsImage(datas);
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
              // value={image.url}
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
              bgcolor: image?.url ? 'white' : '#F6F8FC',
            }}
            component="span"
            children={image?.url ? <CameraAltIcon /> : <div />}
          />
        </Stack>
      </label>
      <label htmlFor={!image?.url ? name : undefined}>
        {!image?.url ? (
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
            {image?.url ? (
              <img
                style={{ margin: 'auto', paddingTop: '30px', width: '50px' }}
                src={image?.url}
                alt="Upload"
              />
            ) : (
              <Grid container>
                <Grid item md={4} display="flex" justifyContent="center">
                  <ImgUpload>
                    <img
                      src={UploadIcon}
                      style={{
                        paddingTop: '25px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                      alt="Upload"
                    />
                  </ImgUpload>
                </Grid>
                <Grid
                  item
                  md={4}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography sx={{ fontSize: '16px', color: '#223250' }}>
                    {label}
                  </Typography>
                  <Typography sx={{ color: '#979797' }}>
                    {t(translations.developerInformation.maxSize)}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </div>
        ) : (
          <CardMedia
            component="img"
            alt="green iguana"
            height="160"
            image={image?.url}
            sx={
              image?.url
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
      </label>
    </div>
  );
}
