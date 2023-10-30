import React from 'react';
import {
  Breadcrumbs,
  Typography,
  Link as LinkItem,
  styled,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  links: any[];
}

const CustomIcon = styled('div')({
  display: 'flex',
  '& svg': {
    height: '16px',
    width: '16px',
  },
});

const RootStyle = styled('div')({
  '& .MuiBreadcrumbs-separator': {
    marginLeft: '2px!important',
    marginRight: '2px!important',
  },
});

const BreadCrumbs = React.memo((props: Props) => {
  const { links } = props;

  return (
    <RootStyle>
      <Breadcrumbs
        sx={{ paddingBottom: '24px', margin: '0' }}
        separator={
          <CustomIcon>
            <ChevronRightIcon />
          </CustomIcon>
        }
        aria-label="breadcrumb"
      >
        {links &&
          links.length &&
          links.map((item, i) =>
            item.path ? (
              <LinkItem
                sx={{
                  textDecoration: 'none',
                }}
                key={i}
                color="inherit"
                href={`${item.path}`}
              >
                <Typography
                  sx={{
                    color:
                      item.path || item.isTableList ? '#005FC5' : '#323232',
                    fontSize: '16px',
                    fontWeight: item.path || item.isTableList ? '600' : '400',
                  }}
                >
                  {item.title}
                </Typography>
              </LinkItem>
            ) : (
              <Typography
                sx={{
                  color: item.path || item.isTableList ? '#005FC5' : '#323232',
                  fontSize: '16px',
                  fontWeight: item.path || item.isTableList ? '600' : '400',
                }}
              >
                {item.title}
              </Typography>
            ),
          )}
      </Breadcrumbs>
    </RootStyle>
  );
});

export default BreadCrumbs;
