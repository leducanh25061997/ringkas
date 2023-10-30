import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 64px;
  /* width: 100%; */
  background: #005fc5;
  border-radius: 10px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
  &:disabled {
    color: #abb4c1;
    background: #eaecef;
  }
`;
export default function SubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { children, ...rest } = props;
  return <Button {...rest}>{children}</Button>;
}
