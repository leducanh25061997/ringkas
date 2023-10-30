interface RowProps {
  title: string;
  description: string | number;
  className?: string;
  link?: string;
}

const CustomRow = ({ title, description, className, link }: RowProps) => {
  return (
    <div className={className}>
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
        {description ?? '-'}{' '}
        <span className="text-[#005FC5] text-[16px] leading-[20px] font-medium underline cursor-pointer">
          {link}
        </span>
      </p>
    </div>
  );
};

export default CustomRow;
