import { Box, Divider, Stack, styled, Typography } from '@mui/material';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { useFormContext } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

interface Props {}

interface RowProps {
  className?: string;
  title: string;
  description: string;
  dotBg?: string;
}

const CustomDate = styled('div')({
  maxWidth: '200px',
  input: {
    paddingRight: '0px!important',
    paddingLeft: '20px!important',
    color: '#6B7A99',
  },
  button: {
    color: '#C3CAD9',
  },
  '& .MuiButtonBase-root': {
    paddingLeft: '0px',
  },
  '& .MuiFilledInput-root': {
    '&.Mui-disabled': {
      backgroundColor: 'white',
    },
  },
});

const Row = ({ className, description, title, dotBg }: RowProps) => {
  return (
    <div className={className}>
      <div
        className={classNames(
          'w-[14px] h-[14px] rounded-[50px] mr-12 relative',
          dotBg,
        )}
      >
        <div className="w-[2px] h-[68px] bg-[#D7E2EE] absolute top-[14px] left-1/2 -translate-x-1/2" />
      </div>
      <div>
        <p className="text-[#223250] text-[16px] leading-[22px] font-bold">
          {title}
        </p>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export const HistoryLog = (props: Props) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const handleDownload = () => {};
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        margin: '0px 24px 24px 24px',
        borderRadius: '12px',
        pt: 4,
      }}
    >
      <Stack sx={{ paddingLeft: '2rem', paddingRight: '1rem' }}>
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '18px', color: '#223250' }}
        >
          {t(translations.common.historyLog)}
        </Typography>
        <div className="flex mt-4">
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: '#6B7A99',
              mr: 2,
              pt: '10px',
            }}
          >
            {t(translations.kprProgram.startDate).toUpperCase()}
          </Typography>
          <CustomDate>
            <ControlledDatePicker
              name={`startDate`}
              label="Start Date	"
              control={control}
              className="mb-4 mr-4 flex-1"
              isNotLabel
            />
          </CustomDate>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: '#6B7A99',
              mr: 2,
              pt: '10px',
            }}
          >
            {`-`}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: '#6B7A99',
              mr: 2,
              pt: '10px',
            }}
          >
            {t(translations.kprProgram.endDate).toUpperCase()}
          </Typography>
          <CustomDate>
            <ControlledDatePicker
              name={`endDate`}
              label="End Date	"
              control={control}
              className="mb-4 mr-4 flex-1"
              isNotLabel
            />
          </CustomDate>
        </div>
        {/* <div className="ml-10 py-4 overflow-y-auto h-[300px]">
          <Row
            className="flex"
            dotBg="bg-[#009CE0]"
            title="16/06/2022 | 21:00"
            description="Submitted KYC form"
          />
          <Row
            className="flex mt-8"
            dotBg="bg-[#D7E2EE]"
            title="16/06/2022 | 22:00"
            description="Submitted KPR preference"
          />
          <Row
            className="flex mt-8"
            dotBg="bg-[#D7E2EE]"
            title="16/06/2022 | 23:00"
            description="Submitted KPR preference"
          />
          <Row
            className="flex mt-8"
            dotBg="bg-[#D7E2EE]"
            title="16/06/2022 | 23:00"
            description="Submitted KPR preference"
          />
          <Row
            className="flex mt-8"
            dotBg="bg-[#D7E2EE]"
            title="16/06/2022 | 23:00"
            description="Submitted KPR preference"
          />
        </div> */}
      </Stack>
      <Divider />
      <div className="flex justify-end">
        <LoadingButton
          sx={{
            padding: '0.5rem 2rem',
            margin: '1rem',
            color: 'white',
            background: '#005FC5',
            fontSize: '16px',
          }}
          onClick={handleDownload}
        >
          {t(translations.common.download)}
        </LoadingButton>
      </div>
    </Box>
  );
};
