import styled from "@emotion/styled";
import type { FC, ReactNode } from "react";
import variables from "@/styles/_exports.module.scss";

interface PillContainerProps {
  children: ReactNode;
  className?: string;
}

const PillContainer: FC<PillContainerProps> = ({ children, className }) => (
  <Container className={className || ""}>{children}</Container>
);

export default PillContainer;

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${variables.size2} ${variables.size10};
  border: 1px solid ${variables["text-teal"]};
  border-radius: 9999px;
`;
