import React from 'react';
import { Grid } from '@mui/material';
import { Key, KV, Row, Value } from 'app/components/DataDisplay';
import { capitalize } from 'lodash';

import { PartnerInformation } from '../types';
import moment from 'moment';

interface Props {
  info?: PartnerInformation;
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
            <Key>{'NIK'}</Key>
            <Value>{info?.kyc?.nik || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Phone Number'}</Key>
            <Value>{info?.kyc?.phone || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Date of Birth'}</Key>
            <Value>{moment(info?.kyc?.dob).format('DD/MM/YYYY') || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Registered Date'}</Key>
            <Value>
              {moment(info?.createdDate).format('DD/MM/YYYY') || '-'}
            </Value>
          </Row>
        </KV>
      </Grid>
    </Grid>
  );
});

export default KYC;
