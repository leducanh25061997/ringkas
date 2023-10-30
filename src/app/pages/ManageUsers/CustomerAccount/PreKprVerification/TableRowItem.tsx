import TasksDropdown from 'app/components/DropdownInput/TasksDropdown';
import Img from 'app/components/Img';
import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldInput, InputKey, VerificationData } from './types';

import fullscreenIcon from 'assets/icons/fullscreen.svg';
import { useTranslation } from 'react-i18next';
import { ApplicationStatus } from '../ListCustomer/types';

type Props = Omit<VerificationData, 'key'> & {
  inputKey: InputKey;
  rowIndex: number;
  verificationStatus: keyof typeof ApplicationStatus;
};

const TableRowItem = ({
  category,
  inputKey,
  values,
  rowIndex,
  valueType,
  status,
  verificationStatus,
  verificationId,
  systemVerifiedStatus,
  lastAction,
  actionNote,
}: Props) => {
  const { register, control, watch, formState } = useFormContext();

  const { t } = useTranslation();

  const actionType = watch(`type-${rowIndex}`)?.value;

  const renderTaskAction = () => {
    switch (actionType) {
      case 'EDITED_BY_ADMIN':
        return (
          <div className="flex flex-col w-full h-fit">
            <input
              type="text"
              {...register(`edit-${rowIndex}`, { required: 'Required' })}
              className={classNames(
                'w-full mt-2 border border-[#D7E2EE] rounded-lg h-[42px] px-4 focus:border-[#005FC5] transition-all leading-5',
                {
                  '!border-[red]': !!formState.errors[`edit-${rowIndex}`],
                },
              )}
              placeholder="Input Text Here"
            />
            {formState.errors[`edit-${rowIndex}`]?.message && (
              <p className="text-[red] text-[14px] mt-2">
                {formState.errors[`edit-${rowIndex}`]?.message}
              </p>
            )}
          </div>
        );
      case 'REQUEST_REVISION':
        return (
          <div className="w-full flex flex-col h-fit">
            <div
              className={classNames(
                'w-full overflow-hidden py-3 px-4 pr-2 mt-2 border border-[#D7E2EE] rounded-lg h-[88px] focus-within:border-[#005FC5] transition-all leading-5',
                {
                  '!border-[red]': !!formState.errors[`note-${rowIndex}`],
                },
              )}
            >
              <textarea
                className="w-full h-full pr-2 scrollbar overflow-y-auto resize-none bg-white"
                placeholder="Input Text Here"
                disabled={verificationStatus === 'KYC_RETURNED'}
                {...register(`note-${rowIndex}`, {
                  required: 'Required',
                })}
              />
            </div>
            {formState.errors[`note-${rowIndex}`]?.message && (
              <p className="text-[red] text-[14px] mt-2">
                {formState.errors[`note-${rowIndex}`]?.message}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex text-[16px] leading-5 p-4 border-b-[#D7E2EE] border-b">
      <div className="w-[16.66%] text-[#6B7A99] px-2">
        <div className="flex font-medium items-center h-[42px]">{category}</div>
      </div>
      <div className="w-[23.34%] text-[#6B7A99] px-2">
        <div className="flex items-center font-medium  h-[42px]">
          {t(FieldInput[inputKey])}
        </div>
      </div>
      <div className="w-[30%] text-[#202A42] px-2">
        {valueType === 'TEXT' ? (
          <div className="flex items-center h-[42px] text-[#223250]">
            <p className="font-medium">{values[0]}</p>
            {/* {systemVerifiedStatus === 'NOT_MATCHED' && (
              <img src={warningIcon} alt="" width={24} height={24} />
            )} */}
          </div>
        ) : (
          <div className="w-full relative">
            {values[0] && (
              <>
                <Img
                  src={values[0]}
                  alt=""
                  className="rounded-lg aspect-video object-cover"
                  width="100%"
                />
                <a
                  className="p-2 absolute right-3 bottom-3 cursor-pointer bg-[rgba(0,0,0,0.5)] rounded-lg"
                  href={values[0]}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={fullscreenIcon} alt="" width={16} height={16} />
                </a>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col grow px-2">
        <Controller
          name={`type-${rowIndex}`}
          control={control}
          render={({ field }) => (
            <TasksDropdown
              value={field.value}
              onChange={field.onChange}
              disabled={verificationStatus === 'KYC_RETURNED'}
            />
          )}
        />

        {renderTaskAction()}
      </div>
    </div>
  );
};
export default TableRowItem;
