import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import styled from 'styled-components';

export const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '2rem 0',
});

export const Label = styled('div')({
  width: '40%',
  fontSize: '16px',
  flexBasis: '40%',
  color: '#223250',
  alignSelf: 'start',
});

export const Value = styled('div')({
  width: '60%',
  fontSize: '16px',
  fontWeight: 600,
  flexBasis: '60%',
  color: '#223250',
});

export const EmailValue = styled('div')({
  width: '60%',
  fontSize: '16px',
  fontWeight: 600,
  color: '#005FC5',
});

export const DropImage = styled.div`
  width: 100%;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='rgb(0, 156, 224)' stroke-width='3' stroke-dasharray='20' stroke-dashoffset='54' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 6px;
  display: inline-block;
  align-self: center;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 10px;
  padding-left: 1rem;
  padding: 3rem;
  background-color: #f6f8fc;
  &.error {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='red' stroke-width='3' stroke-dasharray='20' stroke-dashoffset='54' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;

const StyleTooltip = styled(Tooltip)({
  '& .css-xdgd3p-MuiTooltip-tooltip': {
    marginTop: '-20px!important',
  },
});

const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
  <StyleTooltip
    {...props}
    classes={{
      tooltip: className,
    }}
    followCursor
  />
);
export const CustomToolTip = styled(ToBeStyledTooltip)(({ theme }) => ({
  backgroundColor: ' #fff',
  color: 'rgba(0, 0, 0, 0.87)',
  boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);`,
  fontSize: 11,
  padding: 8,
}));
