import { Box, Button, Grid, styled } from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import homeIcon from 'assets/icons/home.svg';
import PropertyDialog from './PropertyDialog';
import { useSelector } from 'react-redux';
import { selectManageCustomer } from 'app/pages/ManageUsers/CustomerAccount/slice/selectors';
const Title = styled('div')({
  fontWeight: 'bold',
  fontSize: '17px',
  color: '#202A42',
});

interface HeaderType {
  title: string;
  width: string;
}

interface Props {}

const formatCurrency = (n: string) => {
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return n.replace(thousands, '.');
};

const Property = memo((props: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const { propertyDetail } = useSelector(selectManageCustomer);
  const [items, setItems] = useState([
    {
      houseType: 'Tipe Paras B / J-01',
      typeOfLoan: 'Conventional',
      bankPreference: 'Bank Preference',
      preferredTenor: '15 Years',
      unitPrice: 'RP 1.800.000.000',
      discount: '5%',
      soldPrice: 'Rp 1.710.000.000',
    },
  ]);

  const handleChange = () => {
    setOpen(true);
  };

  const header: HeaderType[] = [
    {
      title: t(translations.projectManagement.houseType),
      width: '20%',
    },
    {
      title: t(translations.developerWorkspace.typeOfLoan),
      width: '15%',
    },
    {
      title: t(translations.developerWorkspace.bankPreference),
      width: '15%',
    },
    {
      title: t(translations.developerWorkspace.preferredTenor),
      width: '15%',
    },
    {
      title: t(translations.developerWorkspace.unitPrice),
      width: '15%',
    },
    {
      title: `${t(translations.developerWorkspace.discount)} (%)`,
      width: '15%',
    },
    {
      title: t(translations.developerWorkspace.soldPrice),
      width: '15%',
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        margin: '24px 0px 24px 0px',
        borderRadius: '12px',
        width: '100%',
        py: 3,
        minHeight: '100px',
      }}
    >
      {propertyDetail ? (
        <div className="flex">
          <div className="w-[200px] ml-6">
            <img
              src={
                propertyDetail?.property?.images &&
                propertyDetail?.property?.images[0].url
              }
              alt=""
              className="w-full h-[160px] rounded-lg"
            />
          </div>
          <div className="w-full px-4">
            <Grid container spacing={4} sx={{ px: 4 }}>
              <Grid item md={6} sx={{ alignSelf: 'flex-end' }}>
                <Title>{propertyDetail?.property?.projectName}</Title>
              </Grid>
              <Grid item md={6}>
                <div className="float-right mr-[-10px]">
                  <Button
                    sx={{ background: '#005FC5', color: 'white' }}
                    onClick={handleChange}
                  >
                    <img src={homeIcon} alt="lock-icon" />
                    <span className="ml-2 font-semibold text-[17px]">
                      {t(translations.developerWorkspace.changeProperty)}
                    </span>
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <div className="p-4 flex">
                {header.map((item, index) => (
                  <div
                    className="ml-4 text-[14px] text-[#6B7A99] font-semibold"
                    style={{ width: item.width }}
                    key={`header ${index}`}
                  >
                    {item.title.toUpperCase()}
                  </div>
                ))}
              </div>
              <div>
                <div className="px-4 flex text-[#202A42] text-[16px] font-[500]">
                  <div className="ml-4 w-[20%] text-[#202A42] text-[16px]">
                    {`${propertyDetail?.property?.type} / ${propertyDetail?.property?.unit}`}
                  </div>
                  <div className="ml-4 w-[15%] text-[#202A42] text-[16px]">
                    {'-'}
                  </div>
                  <div className="ml-4 w-[15%] text-[#202A42] text-[16px]">
                    {'-'}
                  </div>
                  <div className="ml-4 w-[15%] text-[#202A42] text-[16px]">
                    {'-'}
                  </div>
                  <div className="ml-4 w-[15%] text-[#202A42] text-[16px]">
                    {`RP ${
                      propertyDetail?.housePrice
                        ? formatCurrency(propertyDetail?.housePrice.toString())
                        : '-'
                    }`}
                  </div>
                  <div className="ml-4 w-[15%] text-[#202A42] text-[16px]">
                    {`${propertyDetail?.discount}%` || '-'}
                  </div>
                  <div className="ml-4 w-[15%] text-[#202A42] text-[16px]">
                    {'-'}
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      ) : (
        <div className="mr-[-10px] h-full flex justify-center items-center">
          <Button
            sx={{ background: '#005FC5', color: 'white' }}
            onClick={handleChange}
          >
            <img src={homeIcon} alt="lock-icon" />
            <span className="ml-2 font-semibold text-[17px]">
              {t(translations.developerWorkspace.changeProperty)}
            </span>
          </Button>
        </div>
      )}
      <PropertyDialog open={open} setOpen={setOpen} />
    </Box>
  );
});

export default Property;
