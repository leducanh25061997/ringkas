import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import searchIcon from 'assets/icons/search.svg';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useDispatch, useSelector } from 'react-redux';
import { useProductManagementSlice } from 'app/pages/InventoryManagement/Products/ProductManagement/slice';
import { FilterListParams } from 'types/FilterParams';
import SearchByDropdown from './SearchByDropdown';
import { SearchKeyType } from 'app/pages/InventoryManagement/Products/ProductManagement/slice/types';
import { selectProductManagement } from 'app/pages/InventoryManagement/Products/ProductManagement/slice/selectors';
import { Box, Divider } from '@mui/material';
import { useManageCustomerSlice } from 'app/pages/ManageUsers/CustomerAccount/slice';
import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import classNames from 'classnames';
import { selectManageCustomer } from 'app/pages/ManageUsers/CustomerAccount/slice/selectors';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: '1rem 0px',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paper': {
    width: '900px',
    maxWidth: '900px',
  },
}));

const Search = styled('div')`
  display: inline-flex;
  background: #fff;
  align-items: center;
  border-radius: 8px;
  margin-right: 1rem;
  margin-left: 2rem;
  padding-right: 16px;
  border: 1px solid #c6d7e0;
  height: 48px;
  .search-icon {
    margin-left: 16px;
  }
  input {
    font-size: 16px;
    padding-left: 16px;
    border: none;
    height: 100%;
    outline: none;
    border-radius: 8px;
  }
`;

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: 'white!important',
    height: '35px',
  },
  '& .MuiInputBase-root': {
    borderBottomColor: 'unset',
    borderRadius: '8px',
    border: '1px solid #C3CAD9',
    padding: '0 1rem',
    color: '#6B7A99',
  },
  '& .MuiInputBase-root:before': {
    right: 'unset',
    content: '""',
    border: 'unset',
    '&.focus': {
      border: 'unset',
    },
  },
  '& .MuiInput-root:after': {
    border: 'unset!important',
  },
  '& .MuiInput-root:before': {
    border: 'unset!important',
  },
});

const formatCurrency = (n: string) => {
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  if (n) return n.replace(thousands, '.');
  return 0;
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const initialFilter = {
  page: 0,
  size: 20,
  searchKey: '',
  status: [],
  orders: '',
  searchKeyTypes: [],
};

interface HeaderType {
  title: string;
  width: string;
}

export default function PropertyDialog(props: Props) {
  const { open, setOpen } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(selectProductManagement);
  const { propertyDetail } = useSelector(selectManageCustomer);
  const params = useParams();
  const { id } = params;
  const [propertyId, setPropertyId] = React.useState<number>(0);
  const { actions } = useProductManagementSlice();
  const { actions: actionsUser } = useManageCustomerSlice();
  const timeoutId = React.useRef<ReturnType<typeof setTimeout>>();
  const [searchBy, setSearchBy] = React.useState<string>();
  const [filter, setFilter] = React.useState<FilterListParams>(initialFilter);
  const handleClose = () => {
    setOpen(false);
  };

  const header: HeaderType[] = [
    {
      title: t(translations.productManagement.propertyType),
      width: '35%',
    },
    {
      title: t(translations.productManagement.propertyUnit),
      width: '35%',
    },
    {
      title: t(translations.productManagement.price),
      width: '30%',
    },
  ];

  const renderItem = (item: any) => {
    return [
      <div className="ml-6 w-[35%] text-[18px]">{`${item?.type}`}</div>,
      <div className="ml-6 w-[35%] text-[18px]">{`${item?.unit}`}</div>,
      <div className="ml-6 w-[30%] text-[18px]">{`Rp. ${formatCurrency(
        item?.pricing?.housePrice.toString(),
      )}`}</div>,
    ];
  };

  const getStatus = (status: string[]) => {
    const newStatus: string[] = [];
    status.map(item => {
      if (item === '') return [];
      else {
        newStatus.push(item);
      }
    });
    return newStatus;
  };

  const fetchDataForPage = (params: FilterListParams) => {
    const body: FilterListParams = {
      size: params.size,
      page: params.page,
      orders: params.orders,
      searchKey: params.searchKey,
      searchKeyTypes: params.searchKeyTypes,
      statusList: getStatus(params.status || []),
    };
    if (propertyDetail?.property?.projectId) {
      body.projectId = propertyDetail?.property?.projectId;
    }
    dispatch(actions.fetchProductsData(body));
    setFilter({
      ...params,
    });
  };

  const fetchDataDefaultForPage = (page: number = 0, size: number = 100) => {
    const body: FilterListParams = {
      size,
      page,
    };
    if (propertyDetail?.property?.projectId) {
      body.projectId = propertyDetail?.property?.projectId;
    }
    dispatch(actions.fetchProductsData(body));
  };

  React.useEffect(() => {
    fetchDataDefaultForPage();
  }, []);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    timeoutId.current && clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      const newFilterParams = {
        ...filter,
        searchKey: e.target.value,
      };
      fetchDataForPage(newFilterParams);
      setFilter(newFilterParams);
    }, 300);
  };

  const handleSearchByChange = (searchKeyType: SearchKeyType) => {
    const _searchKeyTypes: string[] = [];
    _searchKeyTypes.push(searchKeyType);
    const newFilterParams = {
      ...filter,
      searchKeyTypes: _searchKeyTypes,
    };
    fetchDataForPage(newFilterParams);
    setFilter(newFilterParams);
    setSearchBy(searchKeyType);
  };

  const handleUpdateProperty = () => {
    dispatch(
      actionsUser.updateProperty({
        id,
        propertyId,
      }),
    );
    setOpen(false);
    setPropertyId(0);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {t(translations.developerWorkspace.changeProperty)}
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{
            borderTop: 'none!important',
            paddingBottom: '20px!important',
          }}
        >
          <Search className="input px-4 py-2 ml-4">
            <SearchByDropdown
              value={searchBy}
              onChange={handleSearchByChange}
            />
            <img
              src={searchIcon}
              width={24}
              height={24}
              alt=""
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search"
              onChange={handleChangeSearchInput}
            />
          </Search>
          <Box sx={{ mt: 2 }}>
            <div className="p-4 flex border-b border-b-[#D7E2EE]">
              {header.map((item, index) => (
                <div
                  className="ml-6 text-[14px] text-[#6B7A99] font-semibold"
                  style={{ width: item.width }}
                  key={`header ${index}`}
                >
                  {item.title.toUpperCase()}
                </div>
              ))}
            </div>
            {products?.data.map((item, index) => (
              <div
                key={`content ${index}`}
                className={classNames(
                  'hover:bg-[#005FC5] hover:rounded-[8px] hover:!text-[#ffffff] cursor-pointer',
                  {
                    'rounded-[8px] bg-[#005FC5] !text-[#ffffff]':
                      item?.id === propertyId,
                  },
                )}
                onClick={e => {
                  setPropertyId(item?.id || 0);
                }}
              >
                <div
                  className={classNames(
                    'p-4 flex text-[#202A42] font-[500] hover:!text-[#ffffff]',
                    {
                      '!text-[#ffffff]': item?.id === propertyId,
                    },
                  )}
                >
                  {renderItem(item).map((col, index) => col)}
                </div>
              </div>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            autoFocus
            onClick={handleUpdateProperty}
            sx={{ background: '#005FC5', color: 'white', m: 1 }}
            loading={isLoading}
          >
            {t(translations.developerWorkspace.changeProperty)}
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
