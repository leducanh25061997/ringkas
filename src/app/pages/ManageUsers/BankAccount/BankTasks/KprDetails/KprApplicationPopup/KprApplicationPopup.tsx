import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import notFound from 'assets/images/not-found.jpg';
import Img from 'app/components/Img';
import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { KprParams } from 'app/pages/ManageUsers/CustomerAccount/KprRegister/slice/types';
import { fieldNameTransform } from 'utils/commonFunction';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className={classNames('flex items-center mb-6 px-8', className)}>
      <p className="text-[#6B7A99] text-[16px] leading-[20px] min-w-[240px] font-medium">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
        {description}
      </p>
    </div>
  );
};

interface ImageProps {
  url?: string;
  title?: string;
}

export const Image = ({ url, title }: ImageProps) => {
  return (
    <div className="flex items-center mb-6 px-8">
      <p className="text-[#6B7A99] text-[16px] leading-[20px] min-w-[240px] font-medium">
        {title}
      </p>
      <div className="w-full relative w-3/5">
        <Img
          src={url || notFound}
          alt=""
          className="rounded-lg h-[200px] w-full object-cover"
        />
        {url && (
          <a
            className="p-2 absolute right-3 bottom-3 cursor-pointer bg-[rgba(0,0,0,0.5)] rounded-lg"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <img src={fullscreenIcon} alt="" width={16} height={16} />
          </a>
        )}
      </div>
    </div>
  );
};

interface Props {
  kpr?: KprParams[];
}

export const KprApplicationPopup = (props: Props) => {
  const methods = useForm();
  const [type, setType] = React.useState('All');
  const { kpr } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const capitalize = (str: string, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(
      /(?:^|\s|["'([{])+\S/g,
      (match: string) => match.toUpperCase(),
    );
  let categories = Array.from(
    new Set(
      kpr
        ?.filter(item => item.kprCategory)
        .map(item => capitalize(item.kprCategory.replaceAll('_', ' '), true)),
    ),
  );
  categories = ['All', ...categories];

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

  const answersForCategory = (category: string) => {
    if ('ALL' === category) {
      return kpr;
    }
    if ('PERSONAL_DATA' === category) {
      return kpr?.filter(
        item => item.category === 'KYC' || item.kprCategory === 'PERSONAL_DATA',
      );
    }
    return kpr?.filter(item => item.kprCategory === category);
  };

  return (
    <FormProvider {...methods}>
      <form>
        <div className="w-[720px]">
          <FormControl sx={{ ml: 4, width: 170 }}>
            <Select
              value={type}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              {categories.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {type !== 'All' && (
            <p className="text-[#223250] text-[16px] leading-[20px] font-semibold px-8 py-4 mb-6 text-right border-b border-b-[#D7E2EE]">
              COMPLETION{' '}
              {percentageComplete(type.replaceAll(' ', '_').toUpperCase())}
            </p>
          )}
          <div className="max-h-[700px] scrollbar overflow-y-auto mt-4">
            <p className="text-[#223250] text-[16px] leading-[20px] font-semibold px-8 mb-6">
              {type}
            </p>
            {answersForCategory(type.replaceAll(' ', '_').toUpperCase())?.map(
              (item, index) =>
                item.valueType === 'FILE' ? (
                  <Image
                    url={item.values ? item.values[0] : '-'}
                    title={fieldNameTransform(item.key)}
                  />
                ) : (
                  <Row
                    title={fieldNameTransform(item.key)}
                    description={item.values ? item.values[0] : '-'}
                  />
                ),
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
