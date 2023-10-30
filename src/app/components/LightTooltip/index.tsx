import styled from '@emotion/styled';
import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import React, { useEffect, useState } from 'react';

const LightTooltip = styled(
  ({
    children,
    title,
    width,
    className,
    ...props
  }: TooltipProps & { width: number }) => {
    const [elmWidth, setElmWidth] = useState(0);

    useEffect(() => {
      const elm = document.createElement('span');
      elm.innerText = title ? title.toString() : '';
      elm.style.visibility = 'hidden';
      elm.style.pointerEvents = 'none';
      elm.style.position = 'absolute';
      document.body.append(elm);
      setElmWidth(elm.offsetWidth);
      elm.remove();
    }, [title]);

    if (elmWidth >= width)
      return (
        <Tooltip title={title} {...props} classes={{ popper: className }}>
          {children}
        </Tooltip>
      );
    return children;
  },
)(() => ({
  pointerEvents: 'none',
  zIndex: 2,

  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: ' #fff',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);`,
    fontSize: 11,
  },
}));

export default LightTooltip;
