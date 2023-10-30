import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

interface headerProps {
  label: string;
  link?: string;
}

interface Props {
  parentItems: headerProps[];
  title: string;
  className?: string;
}

function PageHeader({ parentItems, title, className }: Props) {
  return (
    <div
      className={classNames(
        'leading-[22px] text-[#005fc5] flex whitespace-pre-wrap',
        className,
      )}
    >
      {parentItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.link ? (
            <Link
              to={item.link}
              className="leading-[22px] !text-[#005FC5] font-semibold cursor-pointer"
            >
              <p className="font-semibold">{item.label}</p>
            </Link>
          ) : (
            <p className="leading-[22px] !text-[#005FC5] font-semibold">
              {item.label}
            </p>
          )}

          <p className="text-[#202A42]">{` > `}</p>
        </React.Fragment>
      ))}
      <p className="text-[#202A42]">{title}</p>
    </div>
  );
}

export default React.memo(PageHeader);
