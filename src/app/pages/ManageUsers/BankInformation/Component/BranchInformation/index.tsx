// @ts-ignore
import { Grid } from '@mui/material';
// @ts-ignore
import { Key, KV, Row, Value, EmailValue } from 'app/components/DataDisplay';
// @ts-ignore
import React from 'react';
import { BankAccountInfo } from 'types/BankAccountManagement';
import { capitalize } from 'lodash';

interface Props {
  info?: BankAccountInfo;
}

const BranchInformation = React.memo(({ info }: Props) => {
  return (
    <Grid container>
      <Grid item md={12}>
        <KV>
          <Row>
            <Key>{'Company Name'}</Key>
            <Value>{info?.company?.name || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Business Organization'}</Key>
            <Value>{capitalize(info?.bankAccountType) || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Province'}</Key>
            <Value>{info?.company?.province || '-'}</Value>
          </Row>
          <Row>
            <Key>{'City/Regency'}</Key>
            <Value>{info?.company?.city || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Branch Name'}</Key>
            <Value>{info?.company?.branchName || '-'}</Value>
          </Row>
          <Row>
            <Key>{'Branch Address'}</Key>
            <Value>{info?.company?.address || '-'}</Value>
          </Row>
        </KV>
      </Grid>
    </Grid>
  );
});

export default BranchInformation;
