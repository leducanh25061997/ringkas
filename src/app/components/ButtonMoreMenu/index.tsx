import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import actionButtonIcon from 'assets/table/action-button-2.svg';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import styled from 'styled-components';
interface Props {
  items: {
    name: string;
    link?: string;
    icon?: string;
    itemComponent: React.ElementType<any>;
    onClick?: any;
  }[];
}

export default function ButtonMoreMenu(props: Props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div onClick={e => e.stopPropagation()}>
      <IconButton
        ref={ref}
        sx={{ padding: '8px 0' }}
        onClick={e => {
          e.stopPropagation();
          setIsOpen(true);
        }}
      >
        <img src={actionButtonIcon} width={24} height={30} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 130, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {props?.items?.map(item => (
          <MenuItem
            key={item.name}
            component={item.itemComponent}
            to={item?.link}
            sx={{ color: 'text.secondary' }}
            onClick={
              item?.onClick
                ? item.onClick
                : () => {
                    return 0;
                  }
            }
          >
            {item?.icon && (
              <ListItemIcon>
                <Icon icon={item.icon} width={24} height={24} />
              </ListItemIcon>
            )}
            <ListItemText
              style={{}}
              primary={item.name}
              primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
