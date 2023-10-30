import Dialog from 'app/components/Dialog';
import { translations } from 'locales/translations';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldInput, InputKey, VerificationLastAction } from './types';

interface RowData {
  category: 'KYC' | 'KYB';
  key: InputKey;
  action: keyof typeof VerificationLastAction;
  actionNote?: string;
  values?: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  data: RowData[];
  onSubmit: () => void;
  //   isVerifying: boolean;
}

function DataVerificationSummary(props: Props) {
  const { open, onClose, data, onSubmit } = props;

  const { t } = useTranslation();

  const rowsData = useMemo(() => {
    if (!data) return [];
    const _rowData: RowItemProps[] = [
      {
        action: 'NO_ACTION_NEEDED',
        total: 0,
        dataName: '',
      },
      {
        action: 'EDITED_BY_ADMIN',
        total: 0,
        dataName: '',
      },
      {
        action: 'REQUEST_REVISION',
        total: 0,
        dataName: '',
      },
    ];

    const updateRowData = (index: number, item: RowData) => {
      _rowData[index].total++;
      if (_rowData[index].dataName) {
        _rowData[index].dataName += `, ${t(FieldInput[item.key])}`;
      } else _rowData[index].dataName += t(FieldInput[item.key]);
    };

    for (const item of data) {
      switch (item.action) {
        case 'NO_ACTION_NEEDED':
          updateRowData(0, item);
          break;
        case 'EDITED_BY_ADMIN':
          updateRowData(1, item);
          break;
        case 'REQUEST_REVISION':
          updateRowData(2, item);
          break;
        default:
          break;
      }
    }
    return _rowData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <Dialog
      title={t(translations.dataVerification.dataVerificationSummary)}
      submitTitle={t(translations.common.continue)}
      onSubmit={onSubmit}
      open={open}
      onPrevious={onClose}
      previousTitle={t(translations.common.back)}
      onClose={onClose}
    >
      <div className="p-10 w-[900px] leading-5 text-[14px]">
        <div className="w-full border border-[#D7E2EE] rounded-3xl">
          <div className="w-full flex items-center h-[68px] text-[#202A42] border-b border-b-[#D7E2EE]">
            <div className="font-semibold uppercase px-6 w-[30%]">
              {t(translations.dataVerification.actionChanges)}
            </div>
            <div className="font-semibold uppercase px-6 w-[20%]">
              {t(translations.dataVerification.total)}
            </div>
            <div className="font-semibold uppercase px-6 w-[50%]">
              {t(translations.dataVerification.dataName)}
            </div>
          </div>
          {rowsData.map((item, index) => {
            return <RowItem {...item} key={index} />;
          })}
        </div>
      </div>
    </Dialog>
  );
}

interface RowItemProps {
  action: keyof typeof VerificationLastAction;
  total: number;
  dataName: string;
}

const RowItem = (props: RowItemProps) => {
  const { action, total, dataName } = props;
  const { t } = useTranslation();
  return (
    <div className="w-full flex border-b border-[#D7E2EE] last:border-0">
      <div className="w-[30%] text-[#6B7A99] font-medium px-6 py-4">
        {t(VerificationLastAction[action])}
      </div>
      <div className="w-[20%] text-[#202A42] font-medium px-6 py-4">
        {total}
      </div>
      <div className="w-[50%] text-[#6B7A99] font-medium px-6 py-4">
        {dataName}
      </div>
    </div>
  );
};

export default DataVerificationSummary;
