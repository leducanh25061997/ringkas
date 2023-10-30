import { Box, MenuItem, Select, styled } from '@mui/material';
import Button from 'app/components/common/Button';
import Spinner from 'app/components/Spinner';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { usePartnerInformationSlice } from '../slice';
import { selectPartnerVerificationDetail } from '../slice/selectors';
import { RequestDataType, VerificationLastAction } from '../slice/types';
import NewDataRequest from './NewDataRequest';
import TableRowItem from './TableRowItem';

interface Props {
  // data: VerificationsData;
  isLoading: boolean;
}
const CustomSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    paddingBottom: '0px!important',
    paddingTop: '0px!important',
    paddingLeft: '0px!important',
    fontWeight: 600,
    color: '#005FC5',
    fontSize: '14px',
  },
  '& em': {
    fontWeight: 600,
    color: '#005FC5',
    fontSize: '14px',
  },
});

function Table({ isLoading }: Props) {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>('ALL');
  const [open, setOpen] = useState(false);
  const [dataRequest, setDataRequest] = useState<RequestDataType[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { actions } = usePartnerInformationSlice();

  const { id } = useParams();

  const { reset, handleSubmit } = useFormContext();

  const {
    kycVerificationData: { data: storedVerificationData },
  } = useSelector(selectPartnerVerificationDetail);

  const handleClickProcess = () => {
    handleSubmit(values => {
      const _data = [];

      // make correct data to send to server
      for (const key of Object.keys(values)) {
        if (key.split('-')[0] !== 'type') continue;
        const index = +key.split('-')[1];

        const row = storedVerificationData[index];
        const action: keyof typeof VerificationLastAction = values[key].value;
        _data.push({
          category: row.category,
          key: row.key,
          action,
          values:
            action === 'EDITED_BY_ADMIN'
              ? [values[`edit-${index}`]]
              : undefined,
          actionNote:
            action === 'REQUEST_REVISION' ? values[`note-${index}`] : undefined,
        });
      }
      dispatch(
        actions.processVerification(
          {
            userUuid: id as string,
            data: _data as any,
          },
          () => {
            setIsVerifying(false);
            // setOpenDataSummary(false);
            Notifier.addNotifySuccess({
              message: t(translations.dataVerification.dataIsBeingProcess),
            });
            navigate(path.partnerAccountList);
          },
          (message: string) => {
            setIsVerifying(false);
            Notifier.addNotifyError({ message });
          },
        ),
      );
    })();
  };

  const handleChangeCategory = (event: any) => {
    setCategory(event.target.value);
  };

  // const handleNewDataRequest = () => {
  //   setOpen(true);
  // };

  useEffect(() => {
    if (!storedVerificationData) return;

    // reset data form
    const _data: Record<string, any> = {};
    for (let i = 0; i < storedVerificationData.length; i++) {
      _data[`note-${i}`] = storedVerificationData[i].actionNote;
      _data[`type-${i}`] =
        storedVerificationData[i].status === 'REQUEST_UPDATE'
          ? {
              label: t(translations.dataVerification.requestRevision),
              value: 'REQUEST_REVISION',
            }
          : {
              label: t(translations.dataVerification.noActionNeeded),
              value: 'NO_ACTION_NEEDED',
            };
    }
    reset(_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedVerificationData]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        mb: 5,
      }}
    >
      <div className="flex px-6 justify-between bordered item">
        <h2 className="py-6 font-bold text-[#202A42] text-[18px] leading-[25px]">
          {t(translations.partnerManagement.partnerDataVerify)}
        </h2>
        {/* <button
          type="button"
          onClick={e => handleNewDataRequest()}
          className="px-6 py-[10px] mt-6  leading-7 font-semibold border border-[#005FC5] rounded-lg text-[#005FC5]"
        >
          {t(translations.partnerManagement.requestNewData)}
        </button> */}
      </div>
      <div className="w-full mt-6">
        <div className="text-[#6B7A99] text-[14px] leading-5 border-b border-[#D7E2EE] flex p-4 w-full">
          <div className="w-[16.66%] font-semibold px-2">
            <CustomSelect
              value={category}
              onChange={handleChangeCategory}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label', border: 'none' }}
            >
              <MenuItem value={'KYB'}>{t(translations.common.kyb)}</MenuItem>
              <MenuItem value={'KYC'}>{t(translations.common.kyc)}</MenuItem>
              <MenuItem value={'ALL'}>{t(translations.common.all)}</MenuItem>
            </CustomSelect>
          </div>
          <div className="font-semibold w-[23.34%] px-2">FIELD NAME</div>
          <div className="font-semibold w-[30%] px-2">INPUT VALUE</div>
          <div className="font-semibold grow px-2">TASK</div>
        </div>
        <div className="w-full min-h-[200px] relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Spinner />
            </div>
          )}
          {storedVerificationData.map((row, index) => (
            <TableRowItem
              {...row}
              show={category === 'ALL' || row.category.includes(category)}
              rowIndex={index}
              inputKey={row.key}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-end items-center h-[75px] px-6">
        <Button
          type="button"
          onClick={handleClickProcess}
          disabled={isVerifying || storedVerificationData.length === 0}
        >
          {t(translations.common.process)}
        </Button>
      </div>
      <NewDataRequest
        open={open}
        setOpen={setOpen}
        items={dataRequest}
        setItems={setDataRequest}
      />
    </Box>
  );
}

export default Table;
