import { Row, Key } from 'app/components/DataDisplay';
import { ControllerUploadImage } from 'app/components/UploadImage';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const DocumentQualificationEdit = () => {
  const { control } = useFormContext();
  return (
    <div>
      <Row>
        <Key>Deed of company*</Key>
        <ControllerUploadImage
          name="fileDeedOfCompany"
          control={control}
          title="Upload Photo or Video"
          description="Maximum Size 5MB"
          rules={{
            required: 'Please fill this field',
          }}
        />
      </Row>
      <Row>
        <Key>NIP*</Key>
        <ControllerUploadImage
          name="fileNIP"
          control={control}
          title="Upload Photo or Video"
          description="Maximum Size 5MB"
          rules={{
            required: 'Please fill this field',
          }}
          className={'mt-8'}
        />
      </Row>
      <Row>
        <Key>NPWP*</Key>
        <ControllerUploadImage
          name="fileNpwp"
          control={control}
          title="Upload Photo or Video"
          description="Maximum Size 5MB"
          rules={{
            required: 'Please fill this field',
          }}
        />
      </Row>
      <Row>
        <Key>SK*</Key>
        <ControllerUploadImage
          name="fileSK"
          control={control}
          title="Upload Photo or Video"
          description="Maximum Size 5MB"
          rules={{
            required: 'Please fill this field',
          }}
        />
      </Row>
    </div>
  );
};

export default DocumentQualificationEdit;
