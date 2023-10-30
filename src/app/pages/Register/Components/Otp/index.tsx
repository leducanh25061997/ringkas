import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, IconButton } from '@mui/material';
import { useAuthSlice } from 'app/pages/Login/slice';
import { BackgroundImage } from 'app/pages/Login/Validate/CheckOTPLogin';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import logo from 'assets/images/logo-ringkas.svg';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import SubmitButton from '../../RegisterBank/Headquarter/components/SubmitButton';

interface Props {
  username: string;
  password: string;
}
export default function Otp(props: Props) {
  const { username, password } = props;

  const navigate = useNavigate();

  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    dispatch(
      actions.checkOTP(
        { otp, username, password },
        () => {
          setLoading(false);
          // navigate(path.root);
        },
        (message: string) => {
          setLoading(false);
          Notifier.addNotifyError({ message });
        },
      ),
    );
  };

  const handleResend = () => {
    setOtp(undefined);
    dispatch(
      actions.resendOTP(
        { username, password },
        e => {
          Notifier.addNotifySuccess({ messageId: 'success.resendSuccess' });
        },
        message => Notifier.addNotifyError({ message }),
      ),
    );
  };
  return (
    <Grid container className="w-full h-full">
      <Grid item xs={5}>
        <BackgroundImage />
      </Grid>
      <Grid item xs={7}>
        <div className="h-full pl-[96px] pt-[42px] pr-[49px]">
          <div className="flex items-center mb-[112px]">
            <IconButton
              sx={{ marginRight: '4px' }}
              onClick={() => navigate(path.login)}
            >
              <ArrowBackIcon />
            </IconButton>
            <img width={112} height={32} alt="" src={logo} />
          </div>
          <h1 className="font-bold text-[28px] leading-[42px] mb-4">
            Email Verification
          </h1>
          <p className="leading-6 mb-6">
            Verification code has been sent to{' '}
            <span className="text-[#005FC5]">{username}</span> please check your
            email
          </p>
          <OtpInput
            className="mb-10"
            value={otp}
            onChange={setOtp}
            inputStyle={{
              color: '#223250',
              fontWeight: 'bold',
              fontSize: '28px',
              marginRight: '16px',
              width: '51px',
              height: '56px',
              textAlign: 'center',
              border: '1px solid #C6D7E0',
              borderRadius: '4px',
            }}
            numInputs={6}
          />
          <SubmitButton
            className="w-[395px]"
            onClick={handleSubmit}
            disabled={loading}
          >
            Verify
          </SubmitButton>
          <p
            className="mt-6 text-[#005FC5] cursor-pointer"
            onClick={handleResend}
          >
            Resend code via email
          </p>
        </div>
      </Grid>
    </Grid>
  );
}
