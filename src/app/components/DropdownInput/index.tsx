/* eslint-disable react-hooks/rules-of-hooks */
import ClearIcon from '@mui/icons-material/Clear';
import useOnClickOutside from 'app/hooks/useOnClickOutside';
import dropdownIcon from 'assets/icons/dropdown.svg';
import spinner from 'assets/loader/spinner.svg';
import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import Dropdown from './Dropdown';

interface DropdownItem {
  label: string;
  value: string;
  file?: string;
  renderItem?: any;
}

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: DropdownItem;
  onChange?: (newValue?: DropdownItem) => void;
  onBlur?: (currentValue?: DropdownItem) => void;
  label: string;
  type?: string;
  options: DropdownItem[];
  isLoading?: boolean;
  rules?: RegisterOptions;
  required?: boolean;
  size?: 'SMALL' | 'NORMAL';
  disabled?: boolean;
  isFreeInput?: boolean;
  renderItem?: any;
}

const DropDownInput = (props: Props) => {
  const {
    className,
    error,
    label,
    name,
    placeholder,
    errorText,
    isLoading,
    value,
    options,
    size = 'NORMAL',
    onChange,
    onBlur,
    required,
    disabled,
    isFreeInput,
    renderItem,
  } = props;
  const [activeInput, setActiveInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [status, setStatus] = useState<'NORMAL' | 'FOCUS'>('NORMAL');
  const [filterOptions, setFilterOptions] = useState(options);

  const inputRef = useRef<HTMLInputElement>(null);
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value?.value) {
      setActiveInput(true);
    } else setActiveInput(false);

    handleSetInputText();
    if (!value) {
      if (inputRef.current) inputRef.current.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => setFilterOptions([...options]), [options]);

  useOnClickOutside(
    rootContainerRef,
    () => {
      handleCloseDropdown();
      handleSetInputText();
    },
    dropdownRef,
  );

  const handleActiveInput = () => {
    setOpenDropdown(true);
    setActiveInput(true);
    setStatus('FOCUS');
  };

  const handleFocusInput = () => {
    // setActiveInput(true);
    setStatus('FOCUS');
  };

  const onClickButton = () => {
    setOpenDropdown(true);
    setStatus('FOCUS');
  };

  const handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setActiveInput(false);
    }
    if (e.target.value && onBlur) {
      onBlur({
        label: e.target.value,
        value: e.target.value,
      });
    }

    setStatus('NORMAL');
  };

  const getTextColor = () => {
    if (error) return '#FF0000';
    if (status === 'FOCUS' && !disabled) return '#005FC5';
  };

  const getBorderColor = () => {
    if (error) return '#FF0000';
    if (status === 'FOCUS' && !disabled) return '#005FC5';
    return '#C6D7E0';
  };

  const handleCloseDropdown = () => {
    if (!value) {
      setActiveInput(false);
    }
    setOpenDropdown(false);
    if (inputRef.current) {
      inputRef.current.value = '';
      setFilterOptions([...options]);
    }

    if (!value) setActiveInput(false);
    setStatus('NORMAL');
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setFilterOptions(() => {
      const newOptions = options.filter(option =>
        option.label
          .toLowerCase()
          .includes(userInput ? userInput.toLowerCase() : ''),
      );
      return [...newOptions];
    });
  };

  const handleSetInputText = () => {
    if (inputRef.current && value?.label) inputRef.current.value = value.label;
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <div
        className={classNames(
          'border flex items-center rounded-lg transition-all relative bg-[#fff]',
          { 'h-[40px] text-[14px]': size === 'SMALL' },
          { 'h-[64px]': size === 'NORMAL' },
          {
            'bg-[#dfe3e8]': disabled,
          },
        )}
        style={{ borderColor: getBorderColor() }}
        ref={rootContainerRef}
      >
        {value?.file && (
          <img
            src={value?.file}
            className="ml-4"
            width={30}
            height={30}
            alt=""
          />
        )}
        <div
          className="grow h-full relative flex items-end leading-6 rounded-lg bg-[#fff]"
          onClick={handleActiveInput}
        >
          <span
            className={classNames(
              'absolute transition-all ml-5',
              {
                'text-black text-[12px] top-2 leading-6': activeInput,
                'text-[#9098a7] top-[20px]': !activeInput,
              },
              { '!top-1 !leading-4': activeInput && size === 'SMALL' },
              { '!top-[7px]': !activeInput && size === 'SMALL' },
              { '!ml-3': size === 'SMALL' },
              {
                'text-[#005fc5]': disabled,
              },
            )}
            style={{ color: getTextColor() }}
          >
            {renderItem || (required ? label + '*' : label)}
          </span>
          <input
            ref={inputRef}
            name={name}
            className={classNames(
              'grow text-black h-full rounded-lg bg-[#fff]',
              {
                'opacity-0 pl-5': !activeInput && size === 'NORMAL',
                'opacity-1 p-[30px_20px_8px_20px]':
                  activeInput && size === 'NORMAL',
                'opacity-0 pl-3': !activeInput && size === 'SMALL',
                'opacity-1 p-[20px_12px_4px_12px]':
                  activeInput && size === 'SMALL',
                'text-[14px]': size === 'SMALL',
                'text-[#000000]': disabled,
              },
              {
                'text-[#6B7A99] bg-[#dfe3e8]': disabled,
              },
            )}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
            onChange={handleChangeInput}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
        {!disabled && (
          <>
            {openDropdown && inputRef.current?.value && (
              <ClearIcon
                fontSize="small"
                className="shrink-0 cursor-pointer mr-2"
                onClick={handleClearInput}
              />
            )}
          </>
        )}
        {isLoading && (
          <div className="shrink-0">
            <img src={spinner} alt="" width={35} height={35} />
          </div>
        )}

        {!disabled && (
          <button className="mr-[18px] shrink-0" type="button">
            <img
              onClick={onClickButton}
              src={dropdownIcon}
              width={12}
              height={7}
              alt=""
            />
          </button>
        )}

        {!disabled && (
          <Dropdown
            ref={dropdownRef}
            keepMounted
            options={filterOptions}
            open={openDropdown}
            onClose={handleCloseDropdown}
            value={value}
            onChange={onChange}
            anchorEl={rootContainerRef.current}
            placement="bottom"
            isFreeInput={isFreeInput}
          />
        )}
      </div>
      {error ? (
        <div className="text-[14px] leading-[18px] mt-[8px] text-[#FF0000]">
          {errorText}
        </div>
      ) : null}
    </div>
  );
};

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
  defaultValue?: DropdownItem;
}

export const ControlledDropdownInput = (props: FieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    name,
    rules,
    value,
    onChange,
    defaultValue,
    errorText,
    error,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <DropDownInput
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

export default DropDownInput;
