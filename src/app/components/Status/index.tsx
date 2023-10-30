import { Box, Stack } from '@mui/material';
import { get } from 'lodash';
import { AccountStatus } from 'types';
import { DeveloperStatusLowerCase } from 'types/enums';

interface Props {
  status: AccountStatus;
}

export const backgroundColor = (status?: AccountStatus): string => {
  switch (get(AccountStatus, `${status}`, '')) {
    case AccountStatus.INACTIVE:
      return '#FFE1CB';
    case AccountStatus.ACTIVE:
      return '#ACF7A6';
    default:
      return '#fff';
  }
};

export const textColor = (status?: AccountStatus): string => {
  switch (get(Status, `${status}`, '')) {
    case AccountStatus.ACTIVE:
      return '#229A16';
    case AccountStatus.INACTIVE:
      return 'rgba(183, 33, 54, 1)';
    default:
      return '#333';
  }
};

const renderStatus = (status?: AccountStatus) => {
  return get(DeveloperStatusLowerCase, `${status}`);
};

export function Status(props: Props) {
  const { status } = props;
  return (
    <>
      <Stack direction="row" justifyContent="flex-start">
        <Box
          sx={{
            backgroundColor: backgroundColor(status),
            padding: '0px 8px',
            borderRadius: '8px',
            color: textColor(status),
            fontWeight: 700,
          }}
        >
          {renderStatus(status)}
        </Box>
      </Stack>
    </>
  );
}
