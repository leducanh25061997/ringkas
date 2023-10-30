import React from 'react';

import startArrowNormal from 'assets/stepper/start/start-normal.svg';
import startArrowActive from 'assets/stepper/start/start-active.svg';
import endArrowNormal from 'assets/stepper/end/end-normal.svg';
import endArrowActive from 'assets/stepper/end/end-active.svg';
import arrowNormal from 'assets/stepper/arrow/arrow-normal.svg';
import arrowActive from 'assets/stepper/arrow/arrow-active.svg';
import classNames from 'classnames';

interface Step {
  title: string;
  description: string;
}
interface Props {
  steps: Step[];
  activeStep: number;
  className?: string;
  onClick?: (e: any, selected: number) => void;
}

export default function Stepper3(props: Props) {
  const { steps, activeStep, className, onClick } = props;

  const renderArrow = (index: number) => {
    // First step
    if (index === 0) {
      if (index === activeStep) return startArrowNormal;
      return startArrowActive;
    }
    // Last step
    if (index === steps.length - 1) {
      if (index <= activeStep) return endArrowActive;
      return endArrowNormal;
    }
    if (index <= activeStep) return arrowActive;
    return arrowNormal;
  };

  return (
    <div className={classNames('overflow-hidden', className)}>
      <div className="flex relative translate-x-1">
        {steps.map((item, index) => (
          <div
            key={index}
            className="relative shrink-0 first:ml-0 ml-[-8px] last:ml-[-16px]"
            onClick={(e: any) => {
              if (onClick) onClick(e, index);
            }}
          >
            <img
              src={renderArrow(index)}
              alt=""
              width={230}
              height={60}
              className="w-[230px] h-[60px]"
            />
            <div
              className={classNames(
                'absolute inset-0 flex flex-col justify-center pl-6',
                {
                  'text-white': index <= activeStep,
                  'text-[#005FC5]': index > activeStep,
                  'translate-x-1': index !== 0 && index !== steps.length - 1,
                  'translate-x-3': index === steps.length - 1,
                },
              )}
            >
              <p className="text-[14px] leading-5 font-[500]">{item.title}</p>
              <p className="text-[12px] leading-4 pr-4">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
