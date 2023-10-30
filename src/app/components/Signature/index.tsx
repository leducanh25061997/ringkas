import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import { Button, Dialog } from '@mui/material';
import { dataUrlToFile, downloadImage } from '../../../utils/commonFunction';
import s3Service from 'services/api/fileService';
import signature from 'assets/icons/signature.svg';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { FileUpload } from 'types/FileUpload';
import styled from 'styled-components';
import GroupButtonAction from '../GroupButtonAction';

interface Props {
  onChange?: (value: FileUpload | undefined) => void;
  name: string;
  value?: FileUpload;
  // className?: string;
  error?: boolean;
  errorText?: string;
}

const style = {
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  borderRadius: '0 0 8px 8px',
};

const Error = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  color: #ff0000;
`;

const StyleWithImage = styled.div`
  height: 106px;
  width: 267px;

  border: 1px solid #c6d7e0;
  border-radius: 8px;

  cursor: pointer;
`;

const StyleWithNoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 106px;
  width: 267px;
  border: 1px solid #c6d7e0;
  border-radius: 8px;
  padding: 20px;

  cursor: pointer;
`;

const Signature = (props: Props) => {
  const { onChange, value, error, errorText } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string | undefined>(value && value?.url);
  const signatureRef = useRef<any>();

  const onReset = () => {
    if (signatureRef) {
      signatureRef.current.clear();
    }
  };

  const onSave = async () => {
    if (signatureRef) {
      const image = signatureRef.current.toDataURL('image/svg+xml', 0.5);
      const file = await dataUrlToFile(image, 'signature');
      const fileName = [file.name];
      s3Service.fetchUrlImages({ fileName }).then(res => {
        s3Service
          .getUrlImageData([{ url: res[0].url as string, files: file }])
          .then(() => {
            onChange && onChange(res[0]);
            setImage(image);
          });
      });
      setOpen(false);
    }
  };

  return (
    <div>
      {image && (
        <div className="cursor-pointer">
          <StyleWithImage onClick={() => setOpen(true)}>
            <img
              className="h-full w-full object-contain"
              src={image || value?.url}
              alt={''}
            />
          </StyleWithImage>
          <GroupButtonAction
            buttonGroup={[
              {
                title: 'View',
                onClick: () => window.open(value && value.url),
              },
              {
                title: 'Download',
                onClick: () => downloadImage(value && value.url),
              },
            ]}
          />
        </div>
      )}

      {!image && (
        <StyleWithNoImage onClick={() => setOpen(true)}>
          <div className="mr-[32px] flex items-center">
            <img src={signature} width={50} height={50} alt="signature" />
          </div>
          <div
            style={{ color: '#223250', fontSize: '12px', lineHeight: '18px' }}
          >
            Sign on the dialog box to add your signature
          </div>
        </StyleWithNoImage>
      )}

      <Dialog open={open} maxWidth="xl" onClose={() => setOpen(false)}>
        <div style={{ margin: 'auto', width: '700px', padding: '20px' }}>
          <div className="w-full h-[87px] bg-[#fff] rounded-lg border border-[#C6D7E0] transition-all">
            <p
              className="text-right text-[#FF0000] text-[12px] leading-[18px] pt-[8px] pr-[12px] cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Close
            </p>
            <p className="text-[#223250] text-[14px] leading-[21px] mt-1 ml-4">
              Sign on the dialog box to add your signature
            </p>
          </div>
          <div className="w-full h-[200px] bg-[#fff] rounded-b-lg">
            <SignaturePad canvasProps={{ style }} ref={signatureRef} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '40px',
            }}
          >
            <Button
              style={{
                width: '100%',
                background: '#fff',
                marginRight: '20px',
                color: '#000',
                border: '1px solid #000',
              }}
              onClick={onReset}
            >
              Reset
            </Button>
            <Button
              style={{
                width: '100%',
                color: '#000',
                background: 'rgba(255, 204, 4, 1)',
              }}
              onClick={onSave}
            >
              Save
            </Button>
          </div>
        </div>
      </Dialog>
      {error ? <Error>{errorText}</Error> : null}
    </div>
  );
};

type FormValues = Record<string, FileUpload>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
}

export const ControllerSignature = (props: FieldProps) => {
  const { control, rules, name, value, onChange, ...rest } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Signature
            {...rest}
            name={name}
            value={field.value || ''}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            onChange={(newFile: FileUpload | undefined) => {
              field.onChange(newFile);
              onChange && onChange(newFile);
            }}
          />
        );
      }}
    />
  );
};
