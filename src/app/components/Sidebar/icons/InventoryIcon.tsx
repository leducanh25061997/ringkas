interface Props {
  active: boolean;
  className?: string;
}
export default function InventoryIcon(props: Props) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 6H8C6.9 6 6 6.9 6 8V15C6 16.1 6.9 17 8 17H22C23.1 17 24 16.1 24 15V8C24 6.9 23.1 6 22 6ZM22 12H18.86C18.39 12 18.02 12.33 17.89 12.78C17.53 14.04 16.35 15 15 15C13.65 15 12.47 14.04 12.11 12.78C11.98 12.33 11.61 12 11.14 12H8V9C8 8.45 8.45 8 9 8H21C21.55 8 22 8.45 22 9V12ZM18.87 19H23C23.55 19 24 19.45 24 20V22C24 23.1 23.1 24 22 24H8C6.9 24 6 23.1 6 22V20C6 19.45 6.45 19 7 19H11.13C11.6 19 11.98 19.34 12.11 19.8C12.46 21.07 13.62 22 15 22C16.38 22 17.54 21.07 17.89 19.8C18.02 19.34 18.4 19 18.87 19Z"
        fill={props.active ? 'white' : 'white'}
      />
    </svg>
  );
}
