import CustomRow from 'app/components/CustomRow';

const Others = () => {
  return (
    <div>
      <div className="flex">
        <CustomRow
          title="Subject"
          description="E-Commerce - Cash on Delivery"
          className="w-2/4"
        />
        <CustomRow
          title="Transaction Value"
          description="Rp 1.000.000"
          className="w-2/4"
        />
      </div>
      <div className="flex mt-6">
        <CustomRow title="Notes" description="-" className="w-2/4" />
        <CustomRow
          title="Latest Update Date"
          description="10/12/2022"
          className="w-2/4"
        />
      </div>
    </div>
  );
};

export default Others;
