import type { FC } from "react";
import styled from "@emotion/styled";
import variables from "@/styles/_exports.module.scss";

const Spinner: FC = () => <SpinnerWrapper />;

export default Spinner;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  inline-size: ${variables.size32};
  block-size: ${variables.size32};
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: ${variables["text-teal"]};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  transform: translate(-50%, -50%);
`;
