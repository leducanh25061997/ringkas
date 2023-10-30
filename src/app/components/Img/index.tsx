/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';

function Img(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {}, []);

  return (
    <>
      <div
        className={classNames(
          props.className,
          'flex items-center justify-center',
          { hidden: !isLoading },
        )}
      >
        <Spinner />
      </div>
      <img
        {...props}
        onLoad={() => setIsLoading(false)}
        className={classNames({ hidden: isLoading }, props.className)}
      />
    </>
  );
}

export default Img;
