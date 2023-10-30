import { Dialog } from '@mui/material';
import { formatCurrency } from 'app/components/CustomTextField';
import deleteIcon from 'assets/icons/delete.svg';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import NormalRow from './NormalRow';

interface Props {
  durationInMonth: number;
  interest: number;
  kprAmount: number;
  open: boolean;
  onClose: () => void;
}
function MonthInstallment({
  open,
  onClose,
  durationInMonth,
  interest,
  kprAmount,
}: Props) {
  const { t } = useTranslation();

  const tableHeaders = [
    t(translations.scoringReady.installmentHeaderMonth),
    t(translations.scoringReady.installmentHeaderInterest),
    t(translations.scoringReady.installmentHeaderPrincipal),
    t(translations.scoringReady.installmentHeaderTotal),
    t(translations.scoringReady.installmentHeaderRemaining),
  ];

  const getRowData = () => {
    const rows = [
      {
        month: 0,
        interest: 0,
        principal: 0,
        totalMonthly: 0,
        remainAmount: kprAmount,
      },
    ];
    for (let i = 1; i <= durationInMonth; i++) {
      const interestAmount = (interest * rows[i - 1].remainAmount) / 12;
      const totalMonthlyInstallment =
        (kprAmount * interest) /
        12 /
        (1 - Math.pow(1 + interest / 12, -1 * durationInMonth));
      const principal = totalMonthlyInstallment - interestAmount;
      const remainAmount = rows[i - 1].remainAmount - principal;
      rows.push({
        month: i,
        interest: interestAmount,
        principal,
        totalMonthly: totalMonthlyInstallment,
        remainAmount,
      });
    }
    return rows;
  };

  const getRows = () => {
    const rowData = getRowData();
    return rowData.map(item => {
      return (
        <NormalRow
          key={item.month}
          data={{
            parameter: `${item.month}`,
            rowData: [
              `Rp ${formatCurrency(Math.round(item.interest))}`,
              `Rp ${formatCurrency(Math.round(item.principal))}`,
              `Rp ${formatCurrency(Math.round(item.totalMonthly))}`,
              `Rp ${formatCurrency(Math.round(item.remainAmount))}`,
            ],
            styles: [
              { color: '#000' },
              { color: '#000' },
              { color: '#000' },
              { color: '#000' },
              { color: '#000' },
            ],
            backgroundColor: `${item.month % 2 === 0 ? '#F8F9FA' : '#FFF'}`,
          }}
        />
      );
    });
  };
  return (
    <Dialog open={open} maxWidth="xl" onClose={onClose}>
      <div className="w-[80vw] min-w-[720px] max-h-[calc(100vh-64px)] bg-white overflow-hidden relative">
        <div className="cursor-pointer top-6 right-6 absolute">
          <img
            src={deleteIcon}
            width={24}
            height={24}
            alt="delete-icon"
            onClick={onClose}
          />
        </div>

        <p className="text-[#202A42] font-bold text-[18px] leading-6 mt-6 text-center">
          {t(translations.scoringReady.calculationOfMonthInstallment)}
        </p>
        <div className="mt-6 w-full leading-5">
          <div className="flex">
            {tableHeaders.map(item => (
              <div
                key={item}
                className="pb-2 w-1/4 text-[#223250] text-[18px] font-semibold px-6 border-b border-b-[#D7E2EE]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-fit max-h-[calc(100vh-166px)] overflow-y-auto scrollbar leading-5 pb-8 border-b border-[#D7E2EE]">
          {getRows()}
        </div>
      </div>
    </Dialog>
  );
}

export default MonthInstallment;
