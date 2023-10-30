import * as React from 'react';
import { useFieldArray, useForm, FormProvider } from 'react-hook-form';
import BankTaskItem from './BankTaskItem';
import { useSelector } from 'react-redux';
import BankTaskDetail from './BankTaskDetail';
import Spinner from 'app/components/Spinner';
import { selectBankTask } from './slice/selectors';
import { useParams } from 'react-router';
import { VerificationStatusResponse } from 'app/pages/ManageUsers/CustomerAccount/PreKprVerification/types';
import { useEffect } from 'react';
import { axiosClient } from 'services/api/axios';

const BankTask = () => {
  const { bankTaskList, isLoading } = useSelector(selectBankTask);
  const methods = useForm({
    defaultValues: {
      bankTask: [{ steps: 1, bankPic: '-', status: '', timer: '' }],
    },
  });

  const { control } = methods;

  const { fields, append } = useFieldArray({
    control,
    name: 'bankTask',
  });

  const isDisplayButtonAddMore = React.useMemo(() => {
    if (!bankTaskList) return;
    return (
      bankTaskList.map((item: any) => item.action).includes('APPROVED') ||
      bankTaskList.map((item: any) => item.action).includes('REJECTED')
    );
  }, [bankTaskList]);

  const { id } = useParams();
  const [customerInfo, setCustomerInfo] =
    React.useState<VerificationStatusResponse>();
  useEffect(() => {
    if (!id) return;
    axiosClient
      .get(`/customer/application/${id}`)
      .then(res => {
        setCustomerInfo(res.data);
      })
      .catch(e => {
        setCustomerInfo(undefined);
      });
  }, [id]);

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[147px]">
        <Spinner />
      </div>
    );

  return (
    <FormProvider {...methods}>
      <form className="p-6 bg-[#fff] rounded-2xl">
        <p className="text-[#005FC5] text-[18px] leading-[25px] font-bold mb-4">
          {`${customerInfo?.account?.fullName ?? '-'}'s`}
          <span className="text-[#202A42] text-[18px] leading-[25px] font-bold">
            {' '}
            Application Status
          </span>
        </p>
        <div className="flex items-center justify-between p-2 border-b border-b-[#D7E2EE]">
          <p className="text-[#6B7A99] text-[16px] leading-[20px] font-semibold flex-1 max-w-[150px]">
            BANK PIC
          </p>
          <p className="text-[#6B7A99] text-[16px] leading-[20px] font-semibold flex-1 max-w-[785px]">
            STATUS
          </p>
          <p className="text-[#6B7A99] text-[16px] leading-[20px] font-semibold flex-1 max-w-[150px]">
            TIMER
          </p>
        </div>

        {bankTaskList &&
          bankTaskList.map((item: any, idx: number) => {
            return <BankTaskDetail key={idx} info={item} />;
          })}

        {!isDisplayButtonAddMore && (
          <>
            {fields.map((item, index) => {
              return (
                <BankTaskItem
                  key={index}
                  index={index + (bankTaskList?.length || 0)}
                  item={item}
                />
              );
            })}
          </>
        )}

        {/* {!isDisplayButtonAddMore && (
          <div
            onClick={() => {
              append({
                bankPic: '-',
                status: '',
                timer: '',
              });
            }}
            className="text-[#005FC5] text-[16px] leading-[22px] border-2 border-dashed border-[#009CE0] rounded-[16px] py-[17px] text-center cursor-pointer"
          >
            <span className="font-semibold">+</span>{' '}
            <span className="underline font-semibold">Add more</span>
          </div>
        )} */}
      </form>
    </FormProvider>
  );
};

export default React.memo(BankTask);
