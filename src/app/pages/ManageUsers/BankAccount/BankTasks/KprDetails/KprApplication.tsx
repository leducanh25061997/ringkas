import React, { useState } from 'react';
import Dialog from 'app/components/Dialog';
import { KprApplicationPopup } from './KprApplicationPopup/KprApplicationPopup';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { KprParams } from 'app/pages/ManageUsers/CustomerAccount/KprRegister/slice/types';

interface Props {
  kpr?: KprParams[];
}

const KprApplication = (props: Props) => {
  const { t } = useTranslation();
  const { kpr } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const doesAnswerExistInKpr = (category: string, key: string) => {
    return (
      (kpr?.filter(
        item =>
          item.kprCategory === category &&
          item.key === key &&
          item.values &&
          item.values.length > 0 &&
          item.values[0],
      ).length ?? 0) > 0
    );
  };

  const doesAnswerExistInKyc = (key: string) => {
    return (
      (kpr?.filter(
        item =>
          item.category === 'KYC' &&
          item.key === key &&
          item.values &&
          item.values.length > 0 &&
          item.values[0],
      ).length ?? 0) > 0
    );
  };

  const percentageComplete = (category: string) => {
    let percent = 0;
    if ('PERSONAL_DATA' === category) {
      let answeredQuestions = 0;
      const totalQuestion = 15;
      if (doesAnswerExistInKyc('fullName')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKyc('gender')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKyc('birthPlace')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKyc('nik')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKyc('npwp')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKyc('phone')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKyc('province')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKyc('address')) {
        answeredQuestions += 1;
      }
      percent = answeredQuestions / totalQuestion;
    } else if ('GUARANTOR' === category) {
      let answeredQuestions = 0;
      const totalQuestion = 14;
      if (doesAnswerExistInKpr('GUARANTOR', 'fullName')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKpr('GUARANTOR', 'dob')) {
        answeredQuestions += 1;
      }
      if (doesAnswerExistInKpr('GUARANTOR', 'nik')) {
        answeredQuestions += 1;
      }
      percent = answeredQuestions / totalQuestion;
    } else {
      let totalQuestion = 0;
      if (category === 'EMPLOYMENT_DATA') {
        totalQuestion = 11;
      } else if (category === 'INCOME_DATA') {
        totalQuestion = 6;
      } else if (category === 'BANK_RELATION') {
        totalQuestion = 3;
      }
      const answeredQuestions =
        kpr?.filter(
          item =>
            item.kprCategory === category &&
            item.values &&
            item.values.length > 0 &&
            item.values[0],
        ).length ?? 0;
      if (totalQuestion > 0) {
        percent = answeredQuestions / totalQuestion;
      }
    }
    if (percent >= 1) {
      return 'COMPLETE';
    }
    return `${Number(percent * 100).toFixed(2)}%`;
  };

  return (
    <div className="card pt-4">
      <div className="px-6 flex justify-between">
        <p className="font-bold text-[20px] leading-6">KPR Application</p>
        <div className="view-all" onClick={() => setIsOpen(true)}>
          {t(translations.common.viewAll)}
        </div>
      </div>

      <div className="pb-4">
        <div className="flex text-[#6B7A99] text-[14px] mt-6 pb-2 border-b border-b-[#D7E2EE]">
          <p className="w-1/2 font-semibold px-6">CATEGORY</p>
          <p className="w-1/2 font-semibold px-6">PERCENTAGE OF COMPLETION</p>
        </div>
        <div className="min-h-[250px] overflow-y-auto scrollbar">
          <Row
            category={t(translations.customerAccountManagement.personalData)}
            percent={percentageComplete('PERSONAL_DATA')}
          />
          <Row
            category={t(translations.customerAccountManagement.employmentData)}
            percent={percentageComplete('EMPLOYMENT_DATA')}
          />
          <Row
            category={t(
              translations.customerAccountManagement.guarantorOrSpouseData,
            )}
            percent={percentageComplete('GUARANTOR')}
          />
          <Row
            category={t(translations.customerAccountManagement.incomeData)}
            percent={percentageComplete('INCOME_DATA')}
          />
          <Row
            category={t(translations.customerAccountManagement.bankRelation)}
            percent={percentageComplete('BANK_RELATION')}
          />
        </div>
      </div>
      <Dialog
        scroll="body"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="KPR Application"
        submitTitle={t(translations.common.download)}
      >
        <KprApplicationPopup kpr={kpr} />
      </Dialog>
    </div>
  );
};

export default KprApplication;

interface RowProps {
  category: string;
  percent: string;
}

const Row = (props: RowProps) => {
  const { category, percent } = props;
  return (
    <div className="flex mt-4">
      <p className="px-6 text-[#6B7A99] font-medium w-1/2">{category}</p>
      <p className="text-[18px] text-[#39C24F] font-semibold w-1/2 px-6 leading-5">
        {percent}
      </p>
    </div>
  );
};
