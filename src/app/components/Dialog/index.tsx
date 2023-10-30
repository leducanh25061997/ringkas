import deleteIcon from '../../../assets/icons/delete.svg';
import React from 'react';
import styled from 'styled-components';
import { DialogProps, Dialog as MuiDialog, Typography } from '@mui/material';
import classNames from 'classnames';

const WrapperStyle = styled.div`
  /* width: 892px; */
  background-color: #fff;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px 8px 0 0;
  //background: #ffdd00;
  height: 70px;

  padding: 0 24px 0 32px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  width: 140px;
  line-height: 28px;
  font-weight: 600;
  background: ${props => (props.disabled ? '#f3f3f3' : '#005fc5')};
  border-radius: 8px;
  margin-left: 40px;
  color: ${props => (props.disabled ? '#000' : '#ffffff')}; ;
`;

const CancelButton = styled.button`
  width: 140px;
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: #005fc5;
  background: #ffffff;
`;

interface Props extends DialogProps {
  extraComponent?: JSX.Element;
  title?: string;
  submitTitle?: string;
  previousTitle?: string;
  onSubmit?: () => void;
  onPrevious?: () => void;
  disabled?: boolean;
  hideFooter?: boolean;
}

const Dialog = (props: Props) => {
  const {
    children,
    title = '',
    onSubmit,
    onPrevious,
    onClose,
    submitTitle = 'Continue',
    previousTitle = 'Back',
    extraComponent,
    disabled,
    hideFooter = false,
    ...rest
  } = props;

  return (
    <MuiDialog maxWidth="xl" onClose={onClose} {...rest}>
      <WrapperStyle>
        <Header>
          <Typography
            sx={{
              color: '#223250',
              fontSize: '20px',
              fontWeight: '700',
              lineHeight: '25px',
              flex: '1 !important',
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
          <img
            src={deleteIcon}
            width={24}
            height={24}
            alt="delete-icon"
            className="cursor-pointer"
            // @ts-ignore
            onClick={onClose}
          />
        </Header>
        {children}
        {!hideFooter && (
          <div
            className={classNames(
              'flex items-center pr-6 h-[80px] border-t border-t-[#D7E2EE]',
              { 'justify-between': extraComponent },
              { 'justify-end': !extraComponent },
            )}
          >
            {extraComponent && <>{extraComponent}</>}
            <div className="flex items-center justify-end">
              {onPrevious && (
                <CancelButton onClick={onPrevious}>
                  {previousTitle}
                </CancelButton>
              )}
              <ConfirmButton onClick={onSubmit} disabled={disabled}>
                {submitTitle}
              </ConfirmButton>
            </div>
          </div>
        )}
      </WrapperStyle>
    </MuiDialog>
  );
};

// @ts-ignore
export default Dialog;
