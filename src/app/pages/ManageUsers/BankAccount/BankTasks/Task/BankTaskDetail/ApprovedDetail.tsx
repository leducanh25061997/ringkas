import React, { ReactElement, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import classNames from 'classnames';
import { BankTaskItem } from '../slice/type';
import moment from 'moment';
import { formatCurrency } from 'app/components/CustomTextField';

interface RowProps {
  title: string;
  description?: string | number;
  className?: string;
}

interface GridCustomProps {
  title: string;
  children: React.ReactNode;
}

interface Props {
  info: BankTaskItem;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className={classNames('mb-4', className)}>
      <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-2 flex-1 mr-4">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium flex-1">
        {description}
      </p>
    </div>
  );
};

const GridCustom = ({ title, children }: GridCustomProps) => {
  return (
    <Grid sx={{ p: 2, margin: '0', width: '100%' }} container spacing={2}>
      <Grid xs={5} md={3}>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium">
          {title}
        </p>
      </Grid>
      <Grid xs={7} md={9}>
        {children}
      </Grid>
    </Grid>
  );
};

const ApprovedDetail = ({ info }: Props) => {
  const { bankTaskFormResponse } = info;

  const pdfName = useMemo(() => {
    const arrayName =
      bankTaskFormResponse &&
      bankTaskFormResponse.sp3k?.documents &&
      bankTaskFormResponse.sp3k?.documents[0]?.split('/');
    return arrayName && arrayName[arrayName.length - 1];
  }, [bankTaskFormResponse]);

  if (!bankTaskFormResponse) return null;

  return (
    <div className="overflow-y-auto border border-[#D7E2EE] rounded-xl w-full">
      <GridCustom title="SP3K">
        <p className="text-[#005FC5] underline text-[16px] leading-[22px] font-semibold mb-6 overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer">
          {pdfName}
        </p>
        <Row
          title="Doc. Number"
          description={bankTaskFormResponse.sp3k.docNumber}
        />
        <div className="pt-2 flex">
          <Row
            title="Expiration Date"
            description={moment(
              bankTaskFormResponse.sp3k.expirationDate,
            ).format('DD/MM/YYYY')}
            className="mr-10"
          />
          <Row
            title="Release Date"
            description={moment(bankTaskFormResponse.sp3k.releaseDate).format(
              'DD/MM/YYYY',
            )}
          />
        </div>
      </GridCustom>

      <div className="w-full h-[1px] bg-[#D7E2EE]" />

      <GridCustom title="Loan Program Name">
        <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
          {bankTaskFormResponse?.bankLoanProgram?.programName || '-'}
        </p>
        <div className="flex">
          <div className="border border-[#D7E2EE] rounded-lg mt-4 divide-y w-1/2 mr-4">
            <div className="p-4 ">
              <p className="mb-4 text-[#6B7A99] text-[16px] leading-[20px] font-medium">
                Interest Rate Requested
              </p>
              <Row
                title="Fixed"
                description={
                  bankTaskFormResponse?.bankLoanProgram?.fixedYear
                    ? `${bankTaskFormResponse.bankLoanProgram?.fixedYear} years`
                    : '-'
                }
                className="mb-4 flex"
              />
              <Row
                title=""
                description={
                  bankTaskFormResponse?.bankLoanProgram?.fixedRate
                    ? `${bankTaskFormResponse?.bankLoanProgram?.fixedRate}%`
                    : '-'
                }
                className="mb-4 flex"
              />
              <Row title="Float" description="11,5%" className="mb-0 flex" />
            </div>
            <div className="p-4">
              <Row title="Admin Fee" description="2,0%" className="flex" />
              <Row
                title="Provision Fee"
                description="2,8%"
                className="mb-0 flex"
              />
            </div>
          </div>
          <div className="border border-[#D7E2EE] rounded-lg mt-4 divide-y w-1/2">
            <div className="p-4">
              <p className="mb-4 text-[#6B7A99] text-[16px] leading-[20px] font-medium">
                Approved Interest Rate
              </p>
              <Row
                title="Fixed"
                description={
                  bankTaskFormResponse?.loanProgram?.fixedYear
                    ? `${bankTaskFormResponse.loanProgram?.fixedYear} years`
                    : '-'
                }
                className="mb-4 flex"
              />
              <Row
                title=""
                description={
                  bankTaskFormResponse?.loanProgram?.fixedRate
                    ? `${bankTaskFormResponse?.loanProgram?.fixedRate}%`
                    : '-'
                }
                className="mb-4 flex"
              />
              <Row
                title="Float"
                description={
                  bankTaskFormResponse?.loanProgram?.floatRate
                    ? `${bankTaskFormResponse?.loanProgram?.floatRate}%`
                    : '-'
                }
                className="mb-0 flex"
              />
            </div>
            <div className="p-4">
              <Row
                title="Admin Fee"
                description={
                  bankTaskFormResponse?.loanProgram?.adminFee
                    ? `${bankTaskFormResponse?.loanProgram?.adminFee}%`
                    : '-'
                }
                className="flex"
              />
              <Row
                title="Provision Fee"
                description={
                  bankTaskFormResponse?.loanProgram?.provisionFee
                    ? `${bankTaskFormResponse?.loanProgram?.provisionFee}%`
                    : '-'
                }
                className="mb-0 flex"
              />
            </div>
          </div>
        </div>
      </GridCustom>

      <div className="w-full h-[1px] bg-[#D7E2EE]" />

      <GridCustom title="KPR Amount">
        <div className="flex">
          <div className="border border-[#D7E2EE] rounded-[8px] pt-4 px-4 mb-4 w-1/2 mr-4">
            <Row
              title="Requested Plafond"
              description={
                bankTaskFormResponse?.kprAmount?.requestedPlafond
                  ? `Rp ${formatCurrency(
                      String(bankTaskFormResponse?.kprAmount?.requestedPlafond),
                    )}`
                  : '-'
              }
            />
            <Row title="Tenor" description="15 years" />
          </div>
          <div className="border border-[#D7E2EE] rounded-[8px] pt-4 px-4 mb-4 w-1/2">
            <Row
              title="Approved Plafond"
              description={
                bankTaskFormResponse?.kprAmount?.approvedPlafond
                  ? `Rp ${formatCurrency(
                      String(bankTaskFormResponse?.kprAmount?.approvedPlafond),
                    )}`
                  : '-'
              }
            />
            <Row
              title="Tenor"
              description={
                bankTaskFormResponse?.loanProgram?.tenor
                  ? `${bankTaskFormResponse?.loanProgram?.tenor} years`
                  : '-'
              }
            />
          </div>
        </div>
      </GridCustom>

      <div className="w-full h-[1px] bg-[#D7E2EE]" />

      <GridCustom title="Name on Certificate">
        <div className="flex">
          <Row
            title="Full name"
            description={
              bankTaskFormResponse?.certificateContact?.nameOnCertificate || '-'
            }
            className="w-1/2 mr-4"
          />
          <Row
            title="Relationship Status"
            description={
              bankTaskFormResponse?.certificateContact?.relationshipStatus ||
              '-'
            }
            className="w-1/2"
          />
        </div>
      </GridCustom>

      <div className="w-full h-[1px] bg-[#D7E2EE]" />

      <GridCustom title="Notary PIC">
        <div className="flex">
          <Row
            title="Name"
            description={bankTaskFormResponse?.notaryPIC?.notaryName || '-'}
            className="w-1/2 mr-4"
          />
          <Row
            title="Phone"
            description={
              bankTaskFormResponse?.notaryPIC?.notaryPhoneNumber || '-'
            }
            className="w-1/2"
          />
        </div>
        <Row
          title="Email"
          description={bankTaskFormResponse?.notaryPIC?.notaryEmail || '-'}
        />
      </GridCustom>
    </div>
  );
};

export default ApprovedDetail;
