import TasksDropdown from 'app/components/DropdownInput/TasksDropdown';
import Img from 'app/components/Img';
import warningIcon from 'assets/icons/warning.svg';
import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';

import fullscreenIcon from 'assets/icons/fullscreen.svg';
import { useTranslation } from 'react-i18next';
import { VerificationData } from '../slice/types';

type Props = Omit<VerificationData, 'key'> & {
  inputKey: string;
  rowIndex: number;
  show: boolean;
};

const TableRowItem = ({
  show,
  category,
  inputKey,
  values,
  rowIndex,
  valueType,
  status,
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
                className="w-full h-full pr-2 scrollbar overflow-y-auto resize-none"
                placeholder="Input Text Here"
                readOnly={status === 'REQUEST_UPDATE'}
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
    <div
      className={classNames(
        'w-full flex text-[16px] leading-5 p-4 border-b-[#D7E2EE] border-b',
        { hidden: !show },
      )}
    >
      <div className="w-[16.66%] text-[#6B7A99] px-2">
        <div className="flex font-medium items-center h-[42px]">
          {category === 'KYB_DOCUMENT' ? 'KYB' : category}
        </div>
      </div>
      <div className="w-[23.34%] text-[#6B7A99] px-2">
        <div className="flex items-center font-medium  h-[42px]">
          {t(`inputKey.${category}.${inputKey}`) || inputKey}
        </div>
      </div>
      <div className="w-[30%] text-[#202A42] px-2">
        {valueType === 'TEXT' ? (
          <div className="flex items-center h-[42px] text-[#223250]">
            <p className="mr-2 font-medium">{values[0]}</p>
            {systemVerifiedStatus === 'NOT_MATCHED' && (
              <img src={warningIcon} alt="" width={24} height={24} />
            )}
          </div>
        ) : (
          <div className="w-full">
            {values.map(src => (
              <div className="w-full mt-4 first:mt-0 relative" key={src}>
                <Img
                  src={src}
                  alt=""
                  className="rounded-lg aspect-video object-cover border"
                />
                <a
                  className="p-2 absolute right-3 bottom-3 cursor-pointer bg-[rgba(0,0,0,0.5)] rounded-lg"
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={fullscreenIcon} alt="" width={16} height={16} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col grow px-2">
        <Controller
          name={`type-${rowIndex}`}
          control={control}
          render={({ field }) => (
            <TasksDropdown value={field.value} onChange={field.onChange} />
          )}
        />

        {renderTaskAction()}
      </div>
    </div>
  );
};
export default TableRowItem;
