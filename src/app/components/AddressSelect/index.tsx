import useOnClickOutside from 'app/hooks/useOnClickOutside';
import dropdownIcon from 'assets/icons/dropdown.svg';
import spinner from 'assets/loader/spinner.svg';
import classNames from 'classnames';
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import AddressSelectForm from './Component/AddressSelectForm';
import { DropdownItem, Address } from './Component/type';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: Address;
  onChange?: (newValue?: Address) => void;
  label: string;
  type?: string;
  isLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const AddressSelect = (props: Props) => {
  const {
    className,
    error,
    label,
    name,
    placeholder,
    errorText,
    isLoading,
    value,
    onChange,
    required,
    disabled,
  } = props;

  const [activeInput, setActiveInput] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [status, setStatus] = useState<'NORMAL' | 'FOCUS'>('NORMAL');

  const inputRef = useRef<any>(null);
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setActiveInput(true);
    } else setActiveInput(false);
  }, [value]);

  useOnClickOutside(
    rootContainerRef,
    () => {
      handleCloseDropdown();
    },
    dropdownRef,
  );

  const handleActiveInput = () => {
    setOpenDropdown(true);
    setActiveInput(true);
  };

  const handleFocusInput = () => {
    setStatus('FOCUS');
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

  const handleCloseDropdown = () => {
    setOpenDropdown(false);
    setStatus('NORMAL');
    if (!value) setActiveInput(false);
  };

  const handleChangeInput = (e: ChangeEvent<any>) => {
    if (!e.target.value) {
      onChange && onChange();
      return;
    }
  };

  const _address = useMemo(() => {
    return (
      value &&
      Object.values(value)
        .filter(item => item !== undefined)
        .join(' / ')
    );
  }, [value]);

  return (
    <div className={className}>
      <div
        className={classNames(
          'min-h-[64px] border flex items-center rounded-lg pb-[2px] transition-all relative bg-white',
          { 'bg-[#DFE3E8]': disabled },
        )}
        style={{ borderColor: getBorderColor() }}
        ref={rootContainerRef}
        onClick={handleActiveInput}
      >
        <div className="grow h-full relative flex items-end leading-6 rounded-lg bg-white">
          <span
            className={classNames('absolute transition-all ml-5', {
              'text-black text-[12px] top-2 leading-6': activeInput,
              'text-[#9098a7] text-[16px] top-[16px]': !activeInput,
              'text-[#005FC5] text-[12px] leading-[]24px top-2': disabled,
            })}
            style={{ color: getTextColor() }}
          >
            {required ? label + '*' : label}
          </span>
          <textarea
            ref={inputRef}
            value={_address}
            name={name}
            className={classNames(
              'resize-none',
              'grow text-black h-full rounded-lg bg-white',
              {
                'opacity-0 pl-5': !activeInput,
                'opacity-1 p-[30px_20px_8px_20px]': activeInput,
                'bg-[#DFE3E8]': disabled,
              },
            )}
            readOnly
            rows={2}
            onFocus={handleFocusInput}
            onChange={handleChangeInput}
            placeholder={placeholder}
          />
        </div>
        {isLoading && (
          <div className="shrink-0">
            <img src={spinner} alt="" width={35} height={35} />
          </div>
        )}
        {!disabled && (
          <button className="mr-[18px] shrink-0" type="button">
            <img src={dropdownIcon} width={12} height={7} alt="" />
          </button>
        )}
        {!disabled && (
          <>
            {openDropdown && (
              <AddressSelectForm
                anchorEl={rootContainerRef.current}
                ref={dropdownRef}
                onClose={handleCloseDropdown}
                onChange={onChange}
                value={value}
                open
              />
            )}
          </>
        )}
      </div>
      {error ? (
        <p className="text-[14px] leading-[18px] mt-2 text-[#FF0000]">
          {errorText}
        </p>
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

export const ControlledAddressSelect = (props: FieldProps) => {
  const { control, name, rules, value, onChange, errorText, error, ...rest } =
    props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <AddressSelect
            {...rest}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            // @ts-ignore
            value={field.value}
            onChange={newValue => {
              field.onChange(newValue);
              onChange && onChange(newValue);
            }}
          />
        );
      }}
    />
  );
};
