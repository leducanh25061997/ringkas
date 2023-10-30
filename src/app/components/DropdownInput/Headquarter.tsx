/* eslint-disable react-hooks/rules-of-hooks */
import useOnClickOutside from 'app/hooks/useOnClickOutside';
import dropdownIcon from 'assets/icons/dropdown.svg';
import spinner from 'assets/loader/spinner.svg';
import ClearIcon from '@mui/icons-material/Clear';
import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import Dropdown from './Dropdown';

interface DropdownItem {
  label: string;
  value: string;
}

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  value?: DropdownItem;
  onChange?: (newValue?: DropdownItem) => void;
  onBlur?: (currentValue?: DropdownItem) => void;
  label: string;
  type?: string;
  required?: boolean;
}

const Headquarter = (props: Props) => {
  const {
    className,
    error,
    label,
    name,
    errorText,
    value,
    onChange,
    required,
  } = props;
  const [activeInput, setActiveInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [status, setStatus] = useState<'NORMAL' | 'FOCUS'>('NORMAL');

  const [options, setOptions] = useState<DropdownItem[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    getData('');
  }, []);

  useEffect(() => {
    if (value?.value) {
      setActiveInput(true);
      if (inputRef.current) {
        inputRef.current.value = value.label;
      }
    } else {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setActiveInput(false);
    }
  }, [value]);

  const getData = (inputText: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      axiosClient
        .get('/console/bank-hq-accounts', { params: { searchKey: inputText } })
        .then(res =>
          setOptions(
            res.data.data.map((item: any) => ({
              label: item.company.name,
              value: item.userUuid,
            })),
          ),
        )
        .finally(() => setIsLoading(false));
    }, 200);
  };

  useOnClickOutside(rootContainerRef, handleCloseDropdown, dropdownRef);

  const handleActiveInput = () => {
    setStatus('FOCUS');
    setOpenDropdown(true);
    setActiveInput(true);
  };

  const handleFocusInput = () => {
    setStatus('FOCUS');
  };

  const handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    setStatus('NORMAL');
  };

  const getTextColor = () => {
    if (error) return '#FF0000';
    if (status === 'FOCUS') return '#005FC5';
  };

  const getBorderColor = () => {
    if (error) return '#FF0000';
    if (status === 'FOCUS') return '#005FC5';
    return '#C6D7E0';
  };

  function handleCloseDropdown() {
    if (!value) setActiveInput(false);
    setStatus('NORMAL');
    setOpenDropdown(false);
  }

  const handleChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    getData(e.target.value);
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
      getData('');
    }
  };

  return (
    <div className={className}>
      <div
        className="h-[64px] border flex items-center rounded-lg transition-all relative bg-white"
        style={{ borderColor: getBorderColor() }}
        ref={rootContainerRef}
      >
        <div
          className="grow h-full relative flex items-end leading-6 rounded-lg bg-white"
          onClick={handleActiveInput}
        >
          <span
            className={classNames('absolute transition-all ml-5', {
              'text-black text-[12px] top-2 leading-6': activeInput,
              'text-[#9098a7] text-[16px] top-[18px]': !activeInput,
            })}
            style={{ color: getTextColor() }}
          >
            {required ? label + '*' : label}
          </span>
          <input
            ref={inputRef}
            name={name}
            className={classNames(
              'grow text-black h-full rounded-lg bg-white',
              {
                'opacity-0 pl-5': !activeInput,
                'opacity-1 p-[30px_20px_8px_20px]': activeInput,
              },
            )}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            onChange={handleChangeInputText}
            placeholder={label}
          />
        </div>
        {openDropdown && (
          <ClearIcon
            fontSize="small"
            className="shrink-0 cursor-pointer mr-2"
            onClick={handleClearInput}
          />
        )}
        {isLoading && (
          <div className="shrink-0">
            <img src={spinner} alt="" width={35} height={35} />
          </div>
        )}
        <button className="mr-[18px] shrink-0" type="button">
          <img src={dropdownIcon} width={12} height={7} alt="" />
        </button>
        <Dropdown
          ref={dropdownRef}
          options={options}
          open={openDropdown}
          onClose={handleCloseDropdown}
          value={value}
          onChange={onChange}
          anchorEl={rootContainerRef.current}
          disablePortal
          placement="bottom"
        />
      </div>
      {error ? (
        <span className="text-[14px] leading-[18px] mt-2 text-[#FF0000]">
          {errorText}
        </span>
      ) : null}
    </div>
  );
};

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
}
export const ControlledHeadquarterDropdown = (props: FieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, name, rules, value, onChange, errorText, error, ...rest } =
    props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => (
        <Headquarter
          {...rest}
          onBlur={(currentValue?: DropdownItem) => {
            if (!currentValue?.label?.trim()) {
              field.onChange();
              return;
            }
          }}
          error={!!fieldState.error}
          errorText={fieldState.error?.message}
          value={field.value}
          onChange={newValue => {
            field.onChange(newValue);
            onChange && onChange(newValue);
          }}
        />
      )}
    />
  );
};

export default Headquarter;
