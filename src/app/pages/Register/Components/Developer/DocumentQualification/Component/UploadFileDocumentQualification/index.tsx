import React from 'react';
import { Grid, Stack, TextField, styled, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import DropZone from 'app/components/DropZone';

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
  accept?: string;
  onDrop: (file: any, path?: string) => void;
  content?: string;
  maxFile?: number;
  path: string;
  image: any;
}

const UploadFileDocumentQualification = React.memo((props: Props) => {
  const { accept, onDrop, content, maxFile, path, image } = props;
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={0} justifyContent="center" mt={5}>
      <Grid item md={12}>
        <Stack
          sx={{
            background: '#F6F8FC',
            border: '1px solid #C6D7E0',
            boxSizing: 'border-box',
            borderRadius: '10px',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Controller
            name="photoKtp"
            render={({ field }) => {
              return (
                <DropZone
                  maxFile={maxFile}
                  accept={accept}
                  onDropFile={onDrop}
                  field={field}
                  content={content}
                  path={path}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          {image && Object.keys(image).length > 0 ? (
            <RenderImage>
              <img src={image.url || ''} />
              <Typography sx={{ mt: 1, color: '#9098A7', fontWeight: '400' }}>
                {image.nameFile || ''}
              </Typography>
            </RenderImage>
          ) : (
            ''
          )}
        </Stack>
      </Grid>
    </Grid>
  );
});

export default UploadFileDocumentQualification;
