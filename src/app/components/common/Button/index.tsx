import classNames from 'classnames';
import React from 'react';
interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode | React.ReactNode[];
  color?: 'primary' | 'secondary';
}

function Button(props: Props) {
  const { children, color = 'primary', className, ...rest } = props;

  const primaryClassName =
    'text-white h-[48px] rounded-lg font-semibold leading-7 py-[10px] px-[50px] bg-[#005FC5] disabled:bg-[#D7E2EE]';
  const secondaryClassName =
    'text-[#005FC5] h-[48px] rounded-lg font-semibold leading-7 py-[10px] px-[50px] bg-[#F6F7FF] disabled:bg-[#D7E2EE]';

  return (
    <button
      className={classNames(className, {
        [primaryClassName]: color === 'primary',
        [secondaryClassName]: color === 'secondary',
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
