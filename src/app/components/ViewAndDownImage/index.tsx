import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button } from '@mui/material';
import { Value } from '../KeyText';

import DropZone from '../DropZone';

interface Props {
  image?: string;
  edit?: boolean;
  accept?: string;
  onDrop?: (file: any, path?: string) => void;
  maxFile?: number;
  path?: string;
  field?: any;
  remove?: boolean;
  onRemove?: (field?: any, path?: string) => void;
}

const ViewAndDownImage = React.memo((props: Props) => {
  const {
    image,
    edit,
    accept,
    onDrop,
    maxFile,
    path,
    field,
    remove,
    onRemove,
  } = props;

  function downloadImage(src: string) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx && ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = 'download.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  }

  return (
    <Box>
      {image ? (
        <React.Fragment>
          <CardMedia
            component="img"
            sx={{
              height: '84px',
              width: '140px',
              borderRadius: '8px',
              border: '1px solid #C6D7E0',
            }}
            image={image}
            alt="Paella dish"
          />
          <Box sx={{ display: 'flex' }}>
            <Button
              href={image}
              target="_blank"
              variant="text"
              sx={{
                color: '#005FC5',
                fontSize: '16px',
                '&:visited': {
                  color: '#005FC5',
                },
                fontWeight: '600!important',
              }}
            >
              View
            </Button>
            {edit && (
              <React.Fragment>
                <span
                  style={{
                    marginRight: '7px',
                    marginTop: 10,
                    color: '#005FC5',
                  }}
                >
                  |
                </span>
                <DropZone
                  maxFile={maxFile}
                  accept={accept}
                  onDropFile={onDrop}
                  field={field}
                  path={path}
                  isEdit
                />
              </React.Fragment>
            )}
            <span
              style={{
                marginRight: '7px',
                marginLeft: '7px',
                marginTop: 10,
                color: '#005FC5',
              }}
            >
              |
            </span>
            {remove ? (
              <Button
                variant="text"
                onClick={() => {
                  onRemove && onRemove(field, path);
                }}
                sx={{
                  color: '#005FC5',
                  fontWeight: '600!important',
                  fontSize: '16px',
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                onClick={() => downloadImage(image)}
                variant="text"
                sx={{
                  color: '#005FC5',
                  fontWeight: '600!important',
                  fontSize: '16px',
                }}
              >
                Download
              </Button>
            )}
          </Box>
        </React.Fragment>
      ) : (
        <Value>-</Value>
      )}
    </Box>
  );
});

export default ViewAndDownImage;
