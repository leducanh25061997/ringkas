import { Typography, Tooltip } from '@mui/material';
interface Props {
  text: any;
  line?: number;
  isFloat?: boolean;
  subText?: any;
}
export const EllipsisText = (props: Props) => (
  <Tooltip title={props.text as string}>
    <Typography
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: props.line || 3,
        maxWidth: 250,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        float: props.isFloat ? 'right' : 'unset',
      }}
    >
      {props.text} {props.subText ? props.subText : ''}
    </Typography>
  </Tooltip>
);
