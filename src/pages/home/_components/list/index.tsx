import { FC } from "react";
import Placeholder from "@/_components/Placeholder";
import { MovieResult } from "@/entities/swapi";
import Item from "./Item";
import styled from "@emotion/styled";
import variables from "@/styles/_exports.module.scss";

interface ListProps {
  movies?: MovieResult[];
}

const List: FC<ListProps> = ({ movies }) => {
  if ((Array.isArray(movies) && movies.length === 0) || !Array.isArray(movies))
    return <Placeholder>No Movies</Placeholder>;

  return (
    <Container>
      {movies.map((movie) => (
        <Item key={movie.episode_id} {...movie} />
      ))}
    </Container>
  );
};

export default List;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: auto;
  padding: 0 var(--padding-x, 0);
  gap: ${variables.size2};

  @media (width > ${variables.md}) {
    --padding-x: ${variables.size32};
  }
`;
