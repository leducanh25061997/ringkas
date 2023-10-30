import { Key, Row, Value } from 'app/components/DataDisplay';
import ViewAndDownImage from 'app/components/ViewAndDownImage';
import React from 'react';
import { PartnerInformation } from '../types';

interface Props {
  info?: PartnerInformation;
}

const DocumentQualification = ({ info }: Props) => {
  return (
    <div>
      <Row>
        <Key>{'Deed of company'}</Key>
        <ViewAndDownImage
          image={
            info?.documentQualification?.fileDeedOfCompany &&
            info?.documentQualification?.fileDeedOfCompany[0]?.url
          }
        />
      </Row>
      <Row>
        <Key>{'NIP'}</Key>
        <ViewAndDownImage
          image={
            info?.documentQualification?.fileNIP &&
            info?.documentQualification?.fileNIP[0]?.url
          }
        />
      </Row>
      <Row>
        <Key>{'NPWP'}</Key>
        <ViewAndDownImage
          image={
            info?.documentQualification?.fileNpwp &&
            info?.documentQualification?.fileNpwp[0]?.url
          }
        />
      </Row>
      <Row>
        <Key>{'SK'}</Key>
        <ViewAndDownImage
          image={
            info?.documentQualification?.fileSK &&
            info?.documentQualification?.fileSK[0]?.url
          }
        />
      </Row>
      <Row>
        <Key>{'NDA'}</Key>
        <Value>-</Value>
      </Row>
      <Row>
        <Key>{'MOU'}</Key>
        <Value>-</Value>
      </Row>
    </div>
  );
};

export default DocumentQualification;
