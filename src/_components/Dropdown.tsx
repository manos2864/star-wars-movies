import { type FC, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import variables from "@/styles/_exports.module.scss";

interface DropdownProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; name: string }[];
}

const Dropdown: FC<DropdownProps> = ({ value, options, onChange }) => (
  <Container value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    ))}
  </Container>
);

export default Dropdown;

const Container = styled.select`
  outline: 0;
  padding: ${variables.size8} ${variables.size4};
  border: 1px solid ${variables["bg-light"]};
  border-radius: 4px;
  font-size: ${variables.size16};
  cursor: pointer;
`;
