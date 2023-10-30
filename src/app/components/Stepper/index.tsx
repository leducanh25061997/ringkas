import styled from 'styled-components';

interface Props {
  step: number;
}

const RootStyle = styled('div')`
  position: relative;
  padding-top: 14px;
  padding-left: 11px;
  height: 50px;
  width: 40px;
`;

const Content = styled('div')`
  background: #d7e9ff;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  color: #005fc5;
  font-weight: bold;
  padding-top: 5px;
  padding-left: 1px;
  margin-top: 2.5px;
  margin-left: -2px;
`;

const Circle = styled('circle')`
  fill: none;
  stroke-width: 20px;
  stroke: #005fc5;
  stroke-dasharray: calc(0.5 * calc(3.14 * 2 * 189)) calc(3.14 * 2 * 189);
`;

const CircleBg = styled('circle')`
  fill: none;
  stroke-width: 20px;
  stroke: #005fc5;
`;

const Svg = styled('svg')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: 3px;
  margin-top: 5px;
`;

export const Stepper = (props: Props) => {
  const { step } = props;
  return (
    <RootStyle>
      <Content>{step}</Content>
      <Svg
        x="0px"
        y="0px"
        viewBox="0 0 397.6 435.3"
        enableBackground="new 0 0 397.6 435.3"
        xmlSpace="preserve"
      >
        {step === 2 && (
          <CircleBg
            cx="198.3"
            cy="217.3"
            r="189.2"
            transform="rotate(270 198.3 217.3)"
          />
        )}
        <Circle
          cx="198.3"
          cy="217.3"
          r="189.2"
          transform="rotate(270 198.3 217.3)"
        />
      </Svg>
    </RootStyle>
  );
};
