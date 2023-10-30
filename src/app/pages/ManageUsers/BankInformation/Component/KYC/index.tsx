import React from 'react';
import { Grid } from '@mui/material';
import { Key, KV, Row, Value } from 'app/components/DataDisplay';
import ViewAndDownImage from 'app/components/ViewAndDownImage';

import { BankAccountInfo } from 'types/BankAccountManagement';
import moment from 'moment';

interface Props {
  info?: BankAccountInfo;
}

const KYC = React.memo((props: Props) => {
  const { info } = props;

  return (
    <Grid container>
      <Grid item md={12}>
        <KV>
          <Row>
            <Key>{'Full Name As ID'}</Key>
            <Value>{info?.kyc?.fullName || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Title in Branch'}</Key>
            <Value>{info?.company?.titleBranch || '-'}</Value>
          </Row>
          <Row>
            <Key>{'NIP'}</Key>
            <Value>{info?.company?.nip || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Phone Number'}</Key>
            <Value>{info?.kyc?.phone || '-'}</Value>
          </Row>
          <Row>
            <Key>{'ID Number'}</Key>
            <Value>{info?.kyc?.nik || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Date of Birth'}</Key>
            <Value>{info?.kyc?.dob || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Registered Date'}</Key>
            <Value>
              {moment(info?.createdDate).format('DD/MM/YYYY') || '-'}
            </Value>
          </Row>
          <Row>
            <Key>{'Photo of ID Card'}</Key>
            <ViewAndDownImage image={info?.kyc?.fileNik?.url} />
          </Row>
          <Row>
            <Key>{'Terms and Conditions Agreement'}</Key>
            <Value>{'Agree'}</Value>
          </Row>
          <Row>
            <Key>{'Digital Signature'}</Key>
            <ViewAndDownImage image={info?.kyc?.fileSignature?.url} />
          </Row>
        </KV>
      </Grid>
    </Grid>
  );
});

export default KYC;
