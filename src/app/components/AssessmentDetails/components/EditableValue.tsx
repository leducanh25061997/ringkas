import Input from 'app/components/Input';
import editIcon from 'assets/icons/edit.svg';
import { translations } from 'locales/translations';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getAssessmentValueType } from 'utils/commonFunction';
import Value from './Value';
interface Props {
  parameter?: string;
  value?: string | number;
  className?: string;
}
const EditableValue = ({ parameter, value, className }: Props) => {
  const [openEdit, setOpenEdit] = useState(false);

  const { control, watch, setValue } = useFormContext();

  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);
  const valueEdited = watch(`${parameter}`);

  useEffect(() => {
    if (openEdit) inputRef.current?.focus();
  }, [openEdit]);

  const handleOpenEdit = () => {
    setOpenEdit(true);
    inputRef.current?.focus();
  };

  const handleCloseEdit = () => {
    if (!valueEdited) setValue(parameter || '', value);
    setOpenEdit(false);
  };

  return (
    <>
      <div className={`flex items-center w-full ${className}`}>
        {openEdit ? (
          <div className="flex pr-6">
            <Controller
              name={parameter || ''}
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    ref={inputRef}
                    type="float"
                    autoComplete="off"
                    placeholder={t(translations.common.inputTextHere)}
                    className="w-full"
                    maxLength={15}
                    onBlur={handleCloseEdit}
                  />
                );
              }}
            />
          </div>
        ) : (
          <>
            <Value
              valueType={getAssessmentValueType(parameter)}
              value={valueEdited}
              className="!w-fit"
            />
            <img
              className="ml-3 cursor-pointer"
              alt=""
              width={20}
              height={20}
              src={editIcon}
              onClick={handleOpenEdit}
            />
          </>
        )}
      </div>
    </>
  );
};

export default EditableValue;
