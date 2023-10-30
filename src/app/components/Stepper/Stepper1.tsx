import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

const Stepper = styled.div`
  position: sticky;
  left: 0;
  width: 100%;
  top: 0;
  z-index: 100;
  /* display: flex; */
  background-color: white;
  .step {
    height: 56px;
    display: flex;
    align-items: center;
    padding-left: 54px;
    font-size: 16px;
    line-height: 24px;
    color: #223250;
    background: #ffffff;
    cursor: pointer;
    pointer-events: none;
    &.active {
      border-radius: 0px 16px 16px 0px;
      color: #ffffff;
      font-weight: 600;
      background: #005fc5;
    }
    &.completed {
      color: #ffffff;
      font-weight: 600;
      pointer-events: all;
      background: #005fc5;
    }
  }
`;
interface Props {
  onChangeStep: (newStep: number) => void;
  steps: { label: string; active: boolean; complete: boolean }[];
  className?: string;
  width?: number;
}
export default function Stepper1(props: Props) {
  const { steps, className, onChangeStep, width } = props;
  return (
    <Stepper className={className}>
      <div style={{ width: width ? `${width}px` : '100%' }} className="flex">
        {steps.map((step, index) => {
          return (
            <div
              style={{ width: `${100 / steps.length}%` }}
              key={step.label}
              className={classNames(
                'step',
                { active: step.active },
                { completed: step.complete },
              )}
              onClick={() => onChangeStep(index)}
            >
              {step.label}
            </div>
          );
        })}
      </div>
    </Stepper>
  );
}
