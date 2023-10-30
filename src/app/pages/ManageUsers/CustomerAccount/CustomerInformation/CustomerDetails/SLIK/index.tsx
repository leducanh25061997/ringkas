import Tabs from 'app/components/Tabs';
import React, { useState } from 'react';
import Subject from './Subject';
import Address from './Address';
import Contact from './Contact';
import Employment from './Employment';
import Credit from './Credit';
import Enquiry from './Enquiry';
// import Others from './Others';
import Payment from './Payment';
import CreditBereau from './CreditBereau';
import { Link, useParams } from 'react-router-dom';

const SLIK = () => {
  const [tabSelect, setTabSelect] = useState<string>('Subject');
  const { id } = useParams();
  return (
    <div className="card">
      <div className="pt-6 px-8 pb-10">
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#202A42] text-[18px] leading-[24px] font-bold">
            SLIK
          </p>
          <Link to={`/manage-users/customer/${id}/slik`} className="view-all">
            View All
          </Link>
        </div>
        <Tabs
          className="mb-6"
          tabList={[
            'Subject',
            'Address',
            'Contact',
            'Employment',
            'Credit Bereau',
            'Payment',
            'Credit',
            'Enquiry',
            // 'Others',
          ]}
          onChange={setTabSelect}
          pageActive={tabSelect}
        />
        {tabSelect === 'Subject' && <Subject />}
        {tabSelect === 'Address' && <Address />}
        {tabSelect === 'Contact' && <Contact />}
        {tabSelect === 'Employment' && <Employment />}
        {tabSelect === 'Credit Bereau' && <CreditBereau />}
        {tabSelect === 'Payment' && <Payment />}
        {tabSelect === 'Credit' && <Credit />}
        {tabSelect === 'Enquiry' && <Enquiry />}
        {/* {tabSelect === 'Others' && <Others />} */}
      </div>
    </div>
  );
};

export default SLIK;
