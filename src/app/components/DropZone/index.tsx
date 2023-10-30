import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, styled } from '@mui/material';

import imageDefault from '../../../assets/images/image_default.svg';

interface Props {
  maxFile?: number;
  accept?: string;
  onDropFile?: (file: any, path?: string) => void;
  field?: any;
  content?: string;
  path?: string;
  isEdit?: boolean;
}

const DrapImage = styled('div')({
  marginTop: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#FFFFFF',
  border: '1px dashed #C6D7E0',
  boxSizing: 'border-box',
  borderRadius: '10px',
  padding: '24px 0',
  '& .image': {
    width: '28px',
  },
});

const UploadImage = styled('div')({
  '&:hover': {
    cursor: 'pointer',
  },
});

const DropZone = React.memo((props: Props) => {
  const { maxFile, accept, onDropFile, content, path, isEdit, field } = props;

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: maxFile,
      accept: accept || '',
      onDrop: files => {
        const newfile = files[0];
        const newData = {
          file: newfile,
          url: URL.createObjectURL(newfile),
          name: newfile.name,
          nameFile: newfile.name,
        };
        onDropFile && onDropFile(newData, path);
        field.onChange(URL.createObjectURL(newfile));
      },
    });

  return (
    <React.Fragment>
      {isEdit ? (
        <section>
          <div {...getRootProps({ className: 'dropzone disabled' })}>
            <input {...getInputProps()} />
            <UploadImage>
              <Button
                sx={{
                  color: '#005FC5',
                  fontSize: '16px',
                  fontWeight: '600!important',
                }}
              >
                Edit
              </Button>
            </UploadImage>
          </div>
        </section>
      ) : (
        <section className="container">
          <p>{content}</p>
          <div {...getRootProps({ className: 'dropzone disabled' })}>
            <input {...getInputProps()} />
            <DrapImage>
              <div className="image">
                <img src={imageDefault} />
              </div>
              <p>{'Maximum file 5MB'}</p>
            </DrapImage>
          </div>
        </section>
      )}
    </React.Fragment>
  );
});

export default DropZone;
