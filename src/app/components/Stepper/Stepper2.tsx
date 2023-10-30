import classNames from 'classnames';
import styled from 'styled-components';

const Stepper = styled.div`
  width: 100%;
  display: flex;
  .step {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 24px;
    color: #8d96b0;
    border-bottom: 6px solid #c6d7e0;
    cursor: pointer;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    pointer-events: none;
    &.completed {
      color: #005fc5;
      font-weight: 600;
      border-color: #005fc5;
      pointer-events: all;
    }
    &.active {
      color: rgb(255, 204, 4);
      font-weight: 600;
      border-color: rgb(255, 204, 4);
    }
  }
`;
interface Props {
  onChangeStep: (newStep: number) => void;
  steps: { label: string; complete: boolean; active: boolean }[];
  className?: string;
}
export default function Stepper2(props: Props) {
  const { onChangeStep, steps, className } = props;
  return (
    <Stepper className={className}>
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
    </Stepper>
  );
}
