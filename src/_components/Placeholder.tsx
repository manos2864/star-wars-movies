import { FC, ReactNode } from "react";

interface PlaceholderProps {
  children: ReactNode;
}

const Placeholder: FC<PlaceholderProps> = ({ children }) => (
  <div>{children}</div>
);

export default Placeholder;
