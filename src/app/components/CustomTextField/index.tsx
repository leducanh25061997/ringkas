/* eslint-disable @typescript-eslint/no-unused-vars */
// import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RegisterOptions, Controller, Control } from 'react-hook-form';
import classNames from 'classnames';
// import useOnClickOutside from 'hooks/useOnClickOutside';
import {
  FLOAT_NUMBER,
  INT_NUMBER,
  PHONE_REGEX,
  NUMBER_REGEX,
} from 'utils/helpers/regex';
import useOnClickOutside from 'app/hooks/useOnClickOutside';
import styled from 'styled-components';
import { Button, IconButton } from '@mui/material';
import eyeIcon from 'assets/icons/eye.svg';
import eyeOffIcon from 'assets/icons/eye-off.svg';
import DeleteIcon from 'assets/icons/delete-icon.svg';
import { useSafeState } from 'app/hooks/useSafeState';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  value?: string;
  onChange?: (value?: string) => void;
  label: string;
  disabled?: boolean;
  //   icon?: string;
  //   errorIcon?: string;
  type?:
    | 'text'
    | 'int'
    | 'float'
    | 'tel'
    | 'currency'
    | 'password'
    | 'id'
    | 'num'
    | 'number';
  // type id sử dụng cho các field id card number
  maxLength?: number;
  autoFormatOnblur?: boolean;
  onBlur?: (value?: string) => void;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  id?: string;
  required?: boolean;
  isBg?: boolean;
  isDelete?: boolean;
  handleDelete?: () => void;
  placeholder?: string;
  isNotRegister?: boolean;
}

export const formatCurrency = (n?: string | number) => {
  if (n === 0) return '0';
  if (!n) return '';
  const money = n.toString();
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return money.replace(thousands, '.');
};

const InputRootContainer = styled.div`
  height: 64px;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: white;

  &.disabledStyle {
    opacity: 1;
    background: #dfe3e8;
  }

  &.update {
    background: white !important;
  }
`;

const RelativeContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  line-height: 24px;

  /* padding-left: 20px;
  padding-right: 20px; */

  .label {
    position: absolute;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    color: #9098a7;
    top: 20px;
    font-size: 16px;
    margin-left: 20px;

    &.active {
      color: #000000;
      font-size: 12px;
      line-height: 24px;
      top: 8px;
    }

    &.disabledStyle {
      color: #005fc5;
      font-size: 12px;
      line-height: 24px;
      top: 8px;
    }

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 85%;
  }

  input {
    flex-grow: 1;
    height: 100%;
    background: white;
    font-size: 16px;

    &.disabledStyle {
      opacity: 1;
      background: #dfe3e8;
    }

    &.update {
      background: white !important;
    }
  }
`;

const InputContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  color: #000000;
  opacity: 0;

  &.active {
    opacity: 1;
    padding: 30px 20px 8px 20px;
  }

  .adornment {
    color: rgba(0, 0, 0, 0.6);
    flex-shrink: 0;
    padding-right: 8px;
    font-weight: 600;
  }
`;

const Error = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  color: #ff0000;
`;

export default function TextField(props: Props) {
  const {
    className,
    error,
    label,
    name,
    id,
    startAdornment,
    endAdornment,
    errorText,
    value,
    onChange,
    // icon,
    // errorIcon,
    onBlur,
    type = 'text',
    maxLength,
    disabled,
    required,
    isBg,
    handleDelete,
    isDelete,
    placeholder,
    isNotRegister,
  } = props;
  const { t } = useTranslation();
  const [activeInput, setActiveInput] = useSafeState(false);

  const [status, setStatus] = useSafeState<'NORMAL' | 'FOCUS'>('NORMAL');
  const [showPassword, setShowPassword] = useSafeState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const rootContainerRef = useRef<HTMLDivElement>(null);

  const inputType = useMemo(() => {
    switch (type) {
      case 'tel':
        return 'tel';
      case 'int':
        return 'tel';
      case 'float':
        return 'tel';
      case 'id':
        return 'tel';
      case 'num':
        return 'num';
      case 'number':
        return 'number';
      case 'password':
        return showPassword ? 'text' : 'password';
      default:
        return 'text';
    }
  }, [type, showPassword]);

  useEffect(() => {
    if (value) {
      setActiveInput(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useOnClickOutside(rootContainerRef, handleDeActiveInput);

  const handleActiveInput = () => {
    setActiveInput(true);
  };

  function handleDeActiveInput() {
    if (type === 'password') {
      if (!inputRef.current?.value) setActiveInput(false);
      return;
    }
    if (!inputRef.current?.value?.trim()) setActiveInput(false);
  }

  const handleFocusInput = () => {
    inputRef.current?.removeAttribute('readonly');
    setActiveInput(true);
    setStatus('FOCUS');
  };

  const handleBlurInput = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(e.target.value);
    setStatus('NORMAL');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    const newValue = e.target.value;
    if (newValue === undefined) return;
    switch (type) {
      case 'int':
        if (INT_NUMBER.test(newValue)) onChange(newValue);
        break;
      case 'id':
        if (INT_NUMBER.test(newValue)) onChange(newValue);
        break;
      case 'num':
        if (NUMBER_REGEX.test(newValue) || newValue === '') onChange(newValue);
        break;
      case 'currency':
        const _newValue = newValue.split('.').join('');
        if (INT_NUMBER.test(_newValue)) onChange(formatCurrency(_newValue));
        break;
      case 'float':
        if (FLOAT_NUMBER.test(newValue) && newValue !== '.') onChange(newValue);
        break;
      case 'tel':
        if (PHONE_REGEX.test(newValue)) onChange(newValue);
        break;
      default:
        onChange(newValue);
        break;
    }
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

  return (
    <div className={className}>
      <InputRootContainer
        className={classNames({
          update: isBg,
          disabledStyle: disabled,
        })}
        style={{ borderColor: getBorderColor() }}
        ref={rootContainerRef}
      >
        <RelativeContainer onClick={handleActiveInput}>
          <span
            className={classNames('label', {
              active: activeInput,
              disabledStyle: disabled,
            })}
            style={{ color: getTextColor() }}
          >
            {label}
          </span>
          <InputContainer
            className={classNames({
              active: activeInput,
            })}
          >
            {startAdornment && (
              <div className="adornment">{startAdornment}</div>
            )}
            <input
              className={classNames({
                update: isBg,
                disabledStyle: disabled,
              })}
              ref={inputRef}
              type={inputType}
              value={value}
              name={name}
              readOnly
              disabled={disabled}
              maxLength={type === 'currency' ? 15 : maxLength}
              onFocus={handleFocusInput}
              onBlur={handleBlurInput}
              placeholder={placeholder || label}
              onChange={handleChange}
              autoComplete="off"
              id={id}
            />
            {isDelete && handleDelete && (
              <Button
                className="adornment"
                onClick={handleDelete}
                sx={{ marginTop: '-20px' }}
              >
                <img src={DeleteIcon} alt="delete icon" />
              </Button>
            )}
            {endAdornment && <div className="adornment">{endAdornment}</div>}
          </InputContainer>
          {type === 'password' && (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              sx={{ flexShrink: 0, marginRight: '10px' }}
            >
              <img
                src={showPassword ? eyeOffIcon : eyeIcon}
                alt=""
                width={22}
                height={22}
              />
            </IconButton>
          )}
        </RelativeContainer>
      </InputRootContainer>
      {error ? <Error>{errorText}</Error> : null}
      {!error && isNotRegister && (
        <Error>
          <span>{t(translations.loginPage.emailNotRegister)} </span>
          <a className="!text-[#005FC5] !underline" href="/sign-up">
            {' '}
            {t(translations.loginPage.link)}{' '}
          </a>
          <span> .</span>
        </Error>
      )}
    </div>
  );
}

type FormValues = Record<string, string>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
  autoFormatOnblur?: boolean;
}
export const ControlledTextField = (props: FieldProps) => {
  const {
    control,
    name,
    autoFormatOnblur = true,
    rules,
    value,
    type,
    onChange,
    errorText,
    error,
    isBg,
    isNotRegister,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <TextField
            {...rest}
            isBg={isBg}
            type={type}
            isNotRegister={isNotRegister}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            value={value || field.value || ''}
            onBlur={currentValue => {
              if (!autoFormatOnblur) return;
              if (!currentValue) return;
              if (type === 'int') {
                field.onChange(
                  currentValue ? String(BigInt(currentValue)) : currentValue,
                );
                return;
              }
              if (type === 'currency') {
                field.onChange(
                  currentValue
                    ? formatCurrency(
                        String(Number(currentValue.split('.').join(''))),
                      )
                    : currentValue,
                );
                return;
              }
              if (type === 'float') {
                field.onChange(
                  currentValue
                    ? String(parseFloat(currentValue))
                    : currentValue,
                );
                return;
              }
              if (type === 'password') {
                field.onChange(currentValue);
                return;
              }

              field.onChange(currentValue?.trim());
            }}
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
