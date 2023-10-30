import React from 'react';
import {
  Avatar,
  Box,
  CardMedia,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { get, set } from 'lodash';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import DefaultAvatar from '../../../assets/images/default_avatar.svg';

interface Props {
  images: any;
  errors: any;
  setImages: any;
  control: any;
  name: string;
  path: string;
  label: string;
}

const CustomAvatar = React.memo((props: Props) => {
  const { errors, images, setImages, control, name, path, label } = props;
  const [imageData, setImageData] = React.useState(get(images, path));

  React.useEffect(() => {
    setImageData(get(images, path));
  }, [images]);

  const handleOnChange = (event: any, field: any) => {
    if (event.target.files.length !== 0) {
      const newData = { ...images };
      set(newData, `${path}.url`, URL.createObjectURL(event.target.files[0]));
      set(newData, `${path}.file`, event.target.files[0]);
      set(newData, `${path}.name`, name);
      set(newData, `${path}.nameFile`, event.target.files[0].name);
      setImages(newData);
      field.onChange(event);
    }
  };

  return (
    <Box sx={{}}>
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
            // justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              // height: '100px',
              objectFit: 'cover',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {imageData?.url ? (
              <Avatar
                alt="avatar"
                src={imageData?.url}
                sx={{ width: 120, height: 120 }}
              />
            ) : (
              <Avatar
                alt="avatar"
                src={DefaultAvatar}
                sx={{ width: 120, height: 120 }}
              />
            )}
          </div>
        </Stack>
      </label>
      {/* <label htmlFor={!imageData?.url ? name : undefined}>
        {!imageData?.url ? (
          <div
            style={{
              height: '100px',
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
              <div style={{ textAlign: 'center', display: 'flex' }}>
                <div style={{ marginTop: '100px' }}>
                  <img src={DefaultAvatar} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <Avatar
            alt="Remy Sharp"
            src={imageData?.url}
            sx={{ width: '100%', height: '100%' }}
          />
        )}
      </label> */}
    </Box>
  );
});

export default CustomAvatar;
