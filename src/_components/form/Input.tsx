import { type FC, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import variables from "@/styles/_exports.module.scss";

interface InputProps {
  placeholder?: string;
  value: string;
  width?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  placeholder,
  width = "200px",
  value,
  onChange,
}) => (
  <InputContainer
    width={width}
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default Input;

const InputContainer = styled.input<{ width: string }>`
  padding: ${variables.size10} ${variables.size12};
  border: 1px solid ${variables["bg-light"]};
  border-radius: 4px;
  width: ${({ width }) => width};

  &:focus-visible {
    outline: none;
    border-color: ${variables["text-green"]};
    box-shadow: 0 0 0 2px ${variables["text-green-light"]};
  }
`;
