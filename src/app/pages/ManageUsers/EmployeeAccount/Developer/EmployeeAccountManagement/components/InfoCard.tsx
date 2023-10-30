import React from 'react';
import styled from 'styled-components';

const RootContainer = styled.div`
  width: 226px;
  padding: 20px;
  margin-right: 40px;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  .label {
    color: #757d8a;
    line-height: 24px;
  }
  .value {
    margin-top: 10px;
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    color: #404d61;
  }
`;

interface Props {
  label: string;
  value: number;
}

export default function InfoCard(props: Props) {
  const { label, value } = props;
  return (
    <RootContainer>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </RootContainer>
  );
}
