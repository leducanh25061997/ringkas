import Link from '@mui/material/Link';
import { formatCurrency } from 'app/components/CustomTextField';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import MonthInstallment from './MonthlyInstallment';
import { selectScoringReady } from './slice/selectors';

function HousePrice() {
  const [openInstallment, setOpenInstallment] = useState(false);

  const { housePriceData } = useSelector(selectScoringReady);

  const { watch } = useFormContext();

  const finalPrice = housePriceData
    ? Math.round(
        housePriceData.housePrice -
          (housePriceData.housePrice * housePriceData.discount) / 100,
      )
    : 0;

  const downPaymentRp = housePriceData
    ? Math.round((finalPrice * housePriceData.downPayment) / 100)
    : 0;

  const kprAmount = housePriceData
    ? Math.round(finalPrice - housePriceData.bookingFee - downPaymentRp)
    : 0;

  const interestRateInPercent = watch('Interest Rate') ?? 7; // default to 7% per year
  const interestRate = interestRateInPercent / 100;
  const ratePerMonth = interestRate / 12;
  const tenorYear = housePriceData?.tenorPreference ?? 15; // default to 15 years
  const tenorMonth = tenorYear * 12;

  const estimatedMonthlyInstallment =
    Math.round(
      (kprAmount * ratePerMonth) /
        (1 - Math.pow(1 + ratePerMonth, -tenorMonth)),
    ) || 0;

  return (
    <div className="w-full bg-white rounded-2xl leading-5 pt-6">
      <div className="text-[#202A42] text-[18px] leading-25px font-bold px-8">
        House Price
      </div>
      <div className="mt-4">
        <div className="flex text-[#6B7A99] text-[14px] px-8 border-b-2 border-[#F6F7FF] pb-2">
          <div className="font-semibold w-[50%]">ITEM</div>
          <div className="font-semibold w-[20%]">%</div>
          <div className="font-semibold w-[30%]">AMOUNT</div>
        </div>
        <div className="w-full px-8 border-b border-[#D7E2EE]">
          <RowItem
            item="House Price"
            amount={formatCurrency(housePriceData?.housePrice) ?? '-'}
          />
          <RowItem
            item="Discount (%)"
            percent={housePriceData?.discount ?? '-'}
          />
          <RowItem
            item="Final Price"
            amount={formatCurrency(finalPrice) ?? '-'}
          />
          <RowItem
            item="Booking Fee (Rp)"
            amount={formatCurrency(housePriceData?.bookingFee) ?? '-'}
          />
          <RowItem
            item="Down Payment (%)"
            percent={housePriceData?.downPayment ?? '-'}
          />
          <RowItem
            item="Down Payment (Rp)"
            amount={formatCurrency(downPaymentRp) ?? '-'}
          />
        </div>
        <div className="flex text-[20px] leading-5 p-8 border-b border-[#D7E2EE]">
          <p className="w-[70%] font-bold text-[#6B7A99]">KPR Amount</p>
          <div className="w-[25%] max-w-[250px] flex justify-between">
            <p className="font-bold">Rp</p>
            <p className="font-bold">{formatCurrency(kprAmount) ?? '-'}</p>
          </div>
        </div>
        <div className="flex text-[20px] leading-5 p-8">
          <p className="w-[70%] font-bold text-[#6B7A99]">
            {`Estimated Monthly Installment (@${tenorMonth}x + ${
              interestRateInPercent || 0
            }%)`}
          </p>
          <div className="w-[25%] max-w-[250px] flex justify-between">
            <p className="font-bold">Rp</p>
            <p className="font-bold">
              {formatCurrency(estimatedMonthlyInstallment) ?? '-'}
            </p>
          </div>
          <Link
            className="text-[16px] pl-3"
            sx={{ fontWeight: 600 }}
            onClick={() => {
              setOpenInstallment(true);
            }}
          >
            View Details
          </Link>
        </div>
      </div>
      <MonthInstallment
        durationInMonth={tenorMonth}
        interest={interestRate}
        kprAmount={kprAmount}
        open={openInstallment}
        onClose={() => {
          setOpenInstallment(false);
        }}
      />
    </div>
  );
}
interface RowItemProps {
  item: string;
  percent?: number | string;
  amount?: number | string;
}
const RowItem = ({ item, percent, amount }: RowItemProps) => {
  return (
    <div className="flex text-[18px] pt-8 last:pb-8">
      <p className="w-[50%] font-medium text-[#6B7A99]">{item}</p>
      <p className="w-[20%] font-medium text-[#202A42]">
        {percent !== undefined ? `${percent}%` : null}
      </p>
      <div className="w-[30%] max-w-[250px] text-[#202A42] flex justify-between">
        {amount !== undefined ? (
          <>
            <p className="font-medium">Rp</p>
            <p className="font-medium">{amount}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HousePrice;
