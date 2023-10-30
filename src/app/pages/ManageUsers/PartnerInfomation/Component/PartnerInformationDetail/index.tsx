// @ts-ignore
import { Grid } from '@mui/material';
// @ts-ignore
import { EmailValue, Key, KV, Row, Value } from 'app/components/DataDisplay';
// @ts-ignore
import React from 'react';
import { PartnerInformation } from '../types';
import { capitalize } from 'lodash';

interface Props {
  info?: PartnerInformation;
}

const PartnerInformationDetail = React.memo(({ info }: Props) => {
  return (
    <Grid container>
      <Grid item md={12}>
        <KV>
          <Row>
            <Key>{'Company Name'}</Key>
            <Value>{info?.company?.name || '-'}</Value>
          </Row>
          <Row>
            <Key>{'NPWP number'}</Key>
            <Value>{capitalize(info?.company?.npwpNumber) || '-'}</Value>
          </Row>
          <Row>
            <Key>{'SPPKP number'}</Key>
            <Value>{info?.company?.sppkpNumber || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Email'}</Key>
            <Value>{info?.company?.email || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Phone number'}</Key>
            <Value>{info?.company?.phone || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Address'}</Key>
            <Value>{info?.company?.address || '-'}</Value>
          </Row>
        </KV>
      </Grid>
    </Grid>
  );
});

export default PartnerInformationDetail;
