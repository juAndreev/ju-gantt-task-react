import { FC, SVGProps } from "react";

export const ExpandMoreIcon: FC<SVGProps<never>> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    color={'inherit'}
    fill={'inherit'}
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
);
