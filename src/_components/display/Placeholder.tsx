import type { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import variables from "@/styles/_exports.module.scss";

interface PlaceholderProps {
  children: ReactNode;
}
const Placeholder: FC<PlaceholderProps> = ({ children }) => (
  <Container>{children}</Container>
);

export default Placeholder;

const Container = styled.div`
  inline-size: 100%;
  block-size: 33vh;
  padding: ${variables.size24};
  text-align: center;
  color: ${variables["text-orange"]};
  border: 1px dashed ${variables["bg-light"]};
  border-radius: ${variables.size8};
  display: flex;
  align-items: center;
  justify-content: center;
`;
