import React from 'react';
import Button from '@mui/material/Button';

interface Props {
  content?: string;
  isDisable?: boolean;
  fullWidth?: boolean;
  variant?: string;
  handleClick?: () => void;
  isBorder?: boolean;
  typeButton?: 'submit' | 'button' | 'reset';
  color?: string;
}

const CustomButton = (props: Props) => {
  const {
    isDisable,
    fullWidth,
    content,
    variant,
    handleClick,
    isBorder,
    typeButton,
    color,
  } = props;
  return (
    <Button
      disabled={isDisable || false}
      type={typeButton}
      fullWidth={fullWidth}
      onClick={event => {
        event.preventDefault();
        handleClick && handleClick();
      }}
      sx={{
        color: color ? color : '#223250',
        boxShadow: 'none',
        padding: '10px 20px',
        fontWeight: '600',
        fontSize: '16px',
        backgroundColor: `${variant} !important`,
        border: isBorder ? '1px solid black' : 'none',
        pt: 2,
        pb: 2,
      }}
    >
      {content}
    </Button>
  );
};

export default CustomButton;
