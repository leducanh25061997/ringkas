import classNames from 'classnames';
import React from 'react';
interface Props {
  percent: number;
  className?: string;
}
export default function ProgressBar({ percent, className }: Props) {
  return (
    <div
      className={classNames('h-6 w-full rounded-lg bg-slate-100', className)}
    >
      <div
        className="rounded-[inherit] h-full bg-[#39C24F] flex items-center justify-center"
        style={{ width: `${percent}%` }}
      >
        <span className="text-white text-[14px] leading-5 font-semibold">{`${percent}%`}</span>
      </div>
    </div>
  );
}
