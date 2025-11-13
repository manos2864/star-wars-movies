import { FC } from "react";
import { MovieResult } from "@/entities/swapi";
import styled from "@emotion/styled";
import variables from "@/styles/_exports.module.scss";
import { numberToRoman } from "@/utils/display";

interface ItemProps extends MovieResult {}

const Item: FC<ItemProps> = ({ title, episode_id, release_date }) => {
  return (
    <Container className="cursor-pointer fs-regular" role="listitem">
      <div>EPISODE {episode_id}</div>

      <div>
        EPISODE {numberToRoman(episode_id)} - {title}
      </div>

      <div></div>

      <div>{release_date}</div>
    </Container>
  );
};

export default Item;

const Container = styled.li`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 0.5fr;
  text-wrap: nowrap;
  align-items: center;
  gap: var(--gap-item, ${variables.size14});
  transition: all 0.1s ease-in;

  white-space: nowrap;
  min-width: 600px;

  padding-block: ${variables.size8};
  padding-inline: ${variables.size12};

  &:hover,
  &:focus-visible {
    background-color: ${variables["bg-extra-light"]};
  }

  @media (width > ${variables.md}) {
    --gap-item: ${variables.size8};
  }
`;
