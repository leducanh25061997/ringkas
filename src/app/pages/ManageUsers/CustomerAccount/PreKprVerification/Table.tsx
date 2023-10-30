import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { ApplicationStatus } from '../ListCustomer/types';
import TableRowItem from './TableRowItem';
import { VerificationsData } from './types';

interface Props {
  data: VerificationsData;
  verificationStatus: keyof typeof ApplicationStatus;
}
function Table({ data, verificationStatus }: Props) {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-6">
      <div className="text-[#6B7A99] text-[14px] leading-5 border-b border-[#D7E2EE] flex p-4 w-full">
        <div className="w-[16.66%] font-semibold px-2 uppercase">
          {t(translations.dataVerification.category)}
        </div>
        <div className="font-semibold w-[23.34%] px-2 uppercase">
          {t(translations.dataVerification.fieldName)}
        </div>
        <div className="font-semibold w-[30%] px-2 uppercase">
          {t(translations.dataVerification.inputValue)}
        </div>
        <div className="font-semibold grow px-2 uppercase">
          {t(translations.dataVerification.task)}
        </div>
      </div>
      <div className="w-full min-h-[200px]">
        {data.map((row, index) => (
          <TableRowItem
            {...row}
            rowIndex={index}
            inputKey={row.key}
            verificationStatus={verificationStatus}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Table;
