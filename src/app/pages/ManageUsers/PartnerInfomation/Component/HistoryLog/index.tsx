import React from 'react';
import { Grid } from '@mui/material';
import {
  HistoryKey,
  HistoryValue,
  KV,
  HistoryRow,
} from 'app/components/DataDisplay';
import { CustomerKyc } from 'types';

interface Props {
  customerKycInfomation?: CustomerKyc;
}

const HistoryLog = React.memo((props: Props) => {
  // const { customerKycInfomation } = props;

  return (
    <Grid container>
      <Grid item md={12}>
        <KV>
          <HistoryRow>
            <KV>
              <HistoryKey>{'Activity Details'}</HistoryKey>
              <HistoryValue>{'Updates data on Date of Birth'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Date'}</HistoryKey>
              <HistoryValue>{'23/11/2022'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Time'}</HistoryKey>
              <HistoryValue>{'11:05:33'}</HistoryValue>
            </KV>
          </HistoryRow>
          <HistoryRow>
            <KV>
              <HistoryKey>{'Activity Details'}</HistoryKey>
              <HistoryValue>{'Updates data on Date of Birth'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Date'}</HistoryKey>
              <HistoryValue>{'23/11/2022'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Time'}</HistoryKey>
              <HistoryValue>{'11:05:33'}</HistoryValue>
            </KV>
          </HistoryRow>
          <HistoryRow>
            <KV>
              <HistoryKey>{'Activity Details'}</HistoryKey>
              <HistoryValue>{'Updates data on Date of Birth'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Date'}</HistoryKey>
              <HistoryValue>{'23/11/2022'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Time'}</HistoryKey>
              <HistoryValue>{'11:05:33'}</HistoryValue>
            </KV>
          </HistoryRow>
          <HistoryRow>
            <KV>
              <HistoryKey>{'Activity Details'}</HistoryKey>
              <HistoryValue>{'Updates data on Date of Birth'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Date'}</HistoryKey>
              <HistoryValue>{'23/11/2022'}</HistoryValue>
            </KV>
            <KV>
              <HistoryKey>{'Activity Time'}</HistoryKey>
              <HistoryValue>{'11:05:33'}</HistoryValue>
            </KV>
          </HistoryRow>
        </KV>
      </Grid>
    </Grid>
  );
});

export default HistoryLog;
