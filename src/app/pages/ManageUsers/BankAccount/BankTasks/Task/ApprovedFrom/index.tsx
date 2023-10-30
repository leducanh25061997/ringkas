import SP3K from './SP3K';
import LoanProgram from './LoanProgram';
import KprAmount from './KprAmount';
import NameCertificate from './NameCertificate';
import NotaryPic from './NotaryPic';

import { FormProvider, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import deleteIcon from 'assets/icons/delete.svg';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createService } from 'services/api/axios';
import { useParams } from 'react-router';
import { useBankTaskSlice } from '../slice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Notifier from 'app/pages/Notifier';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { selectManageCustomer } from 'app/pages/ManageUsers/CustomerAccount/slice/selectors';
import { useManageCustomerSlice } from 'app/pages/ManageUsers/CustomerAccount/slice';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px 8px 0 0;
  height: 70px;

  padding: 0 24px 0 32px;
  border-bottom: 1px solid #d7e2ee;
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

const baseURL = process.env.REACT_APP_API_URL;
const instance = createService(baseURL);

const ApprovedFrom = ({ onClose }: Props) => {
  const [listBankLoan, setListBankLoan] = React.useState<any>([]);
  const { actions } = useBankTaskSlice();
  const customerActions = useManageCustomerSlice().actions;
  const dispatch = useDispatch();
  const methods = useForm();
  const { id } = useParams();
  const { userInformation } = useSelector(selectAuth, shallowEqual);

  useEffect(() => {
    if (!id) return;
    dispatch(customerActions.fetchPropertyDetail(id));
  }, [id]);

  const { propertyDetail } = useSelector(selectManageCustomer);
  const finalPrice =
    propertyDetail && propertyDetail.housePrice
      ? Math.round(
          propertyDetail.housePrice -
            (propertyDetail.housePrice * propertyDetail.discount) / 100,
        )
      : 0;

  const downPaymentRp =
    propertyDetail && propertyDetail.downPayment
      ? Math.round((finalPrice * propertyDetail.downPayment) / 100)
      : 0;

  const kprAmount =
    propertyDetail && propertyDetail.bookingFee
      ? Math.round(finalPrice - propertyDetail.bookingFee - downPaymentRp)
      : 0;

  const requestedPlafondDefault = kprAmount;

  const onSubmit = (data: any) => {
    if (!id) return;
    const { sp3k, kprAmount, certificateContact, notaryPIC, loanProgram } =
      data;

    const payload = {
      applicationId: id,
      action: 'APPROVED',
      // picActor: string,
      bankTaskFormApprove: {
        sp3k: {
          documents: [sp3k.documents.s3Key],
          docNumber: Number(sp3k.docNumber),
          expirationDate: Number(moment(sp3k.expirationDate).format('x')),
          releaseDate: Number(moment(sp3k.releaseDate).format('x')),
        },
        kprAmount: {
          requestedPlafond: requestedPlafondDefault,
          approvedPlafond: kprAmount.approvedPlafond,
        },
        certificateContact: {
          ...certificateContact,
        },
        notaryPIC: {
          ...notaryPIC,
        },
        loanProgram: {
          ...loanProgram,
          bankLoanId: data.loanProgram?.value,
          tenor: data.loanProgram?.tenor?.value,
        } as any,
        bankLoanId: data.loanProgram?.value,
      },
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
        },
      ),
    );
  };

  React.useEffect(() => {
    instance
      .get(`console/bank/${userInformation?.userUuid}/loans?statusList=ACTIVE`)
      .then(res => {
        setListBankLoan(res.data.data);
      })
      .catch(e => {
        setListBankLoan([]);
      });
  }, [userInformation]);

  return (
    <FormProvider {...methods}>
      <form className="min-w-[900px]" onSubmit={methods.handleSubmit(onSubmit)}>
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
            Finalize Customer Application
          </Typography>
          <img
            src={deleteIcon}
            width={24}
            height={24}
            alt="delete-icon"
            className="cursor-pointer"
            onClick={onClose}
          />
        </Header>
        <div className="max-h-[800px] scrollbar overflow-y-auto">
          <SP3K />
          <div className="w-full h-[1px] bg-[#D7E2EE]" />
          <LoanProgram listBankLoan={listBankLoan} />
          <div className="w-full h-[1px] bg-[#D7E2EE]" />
          <KprAmount requestedPlafondDefault={requestedPlafondDefault} />
          <div className="w-full h-[1px] bg-[#D7E2EE]" />
          <NameCertificate />
          <div className="w-full h-[1px] bg-[#D7E2EE]" />
          <NotaryPic />
        </div>
        <div className="flex justify-end py-4 px-8 border-t border-t-[#D7E2EE]">
          <ConfirmButton type="submit">Confirm Approve</ConfirmButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default ApprovedFrom;
