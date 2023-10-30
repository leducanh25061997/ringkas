interface Props {
  onClick: () => void;
}

const ViewAllButton = ({ onClick }: Props) => {
  return (
    <p
      className="text-[#005FC5] text-[16px] leading-[20px] font-semibold"
      onClick={onClick}
    >
      View all
    </p>
  );
};

export default ViewAllButton;
