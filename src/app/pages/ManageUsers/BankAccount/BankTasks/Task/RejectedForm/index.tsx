import { Typography } from '@mui/material';
import deleteIcon from 'assets/icons/delete.svg';
import { Controller, useForm } from 'react-hook-form';
import React from 'react';
import styled from 'styled-components';
import { useBankTaskSlice } from '../slice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Notifier from 'app/pages/Notifier';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px 8px 0 0;
  height: 70px;

  padding: 0 24px 0 32px;
`;

const ConfirmButton = styled.button`
  padding: 10px 16px;
  line-height: 28px;
  font-weight: 600;
  background: #005fc5;
  border-radius: 8px;
  color: #ffffff;
`;

interface Props {
  onClose: () => void;
}

const RejectedForm = ({ onClose }: Props) => {
  const { handleSubmit, control } = useForm();
  const { actions } = useBankTaskSlice();
  const dispatch = useDispatch();
  const { id } = useParams();

  const onSubmit = (data: any) => {
    if (!id) return;

    const { note } = data;
    const payload = {
      applicationId: id,
      action: 'REJECTED',
      note,
    };
    dispatch(
      actions.updateStatusBankTask(
        payload,
        () => {
          Notifier.addNotifySuccess({
            message: 'Update status successfully',
          });
          onClose();
          dispatch(actions.getBankTasks(id));
        },
        () => {
          Notifier.addNotifyError({
            message: 'Update status failed',
          });
          onClose();
        },
      ),
    );
  };

  return (
    <form className="min-w-[720px]" onSubmit={handleSubmit(onSubmit)}>
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
          Reject Confirmation
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
      <div className="p-6">
        <Controller
          name="note"
          rules={{
            required: 'Please fill this field',
          }}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <textarea
                  rows={7}
                  value={field.value}
                  onChange={field.onChange}
                  className="border border-[#D7E2EE] rounded-xl py-[10px] px-[14px] w-full"
                  placeholder="Text something..."
                />
                {fieldState.error && (
                  <p className="mt-2 text-[#FF0000]">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            );
          }}
        />
      </div>
      <div className="flex justify-end py-4 px-8 border-t border-t-[#D7E2EE]">
        <ConfirmButton type="submit">Confirm Reject</ConfirmButton>
      </div>
    </form>
  );
};

export default RejectedForm;
