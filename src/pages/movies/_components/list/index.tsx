import type { FC } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

import Placeholder from "@/_components/display/Placeholder";
import variables from "@/styles/_exports.module.scss";
import {
  selectMoviesAreLoading,
  selectFilteredSortedMovieIds,
} from "@/store/movies/selectors";
import Spinner from "@/_components/feedback/Spinner";
import Item from "./Item";

const List: FC = () => {
  const filteredMovieIds = useSelector(selectFilteredSortedMovieIds);
  const isLoading = useSelector(selectMoviesAreLoading);
  const isEmpty =
    (Array.isArray(filteredMovieIds) && filteredMovieIds.length === 0) ||
    !Array.isArray(filteredMovieIds);

  return (
    <BorderContainer>
      {isLoading ? <Spinner /> : null}

      <ListContainer>
        {isEmpty && !isLoading ? <Placeholder>No Movies</Placeholder> : null}

        {!isEmpty &&
          filteredMovieIds.map((movieId) => (
            <Item key={movieId} movieId={movieId} />
          ))}
      </ListContainer>
    </BorderContainer>
  );
};

export default List;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  padding: 0;
`;

const BorderContainer = styled.div`
  position: relative;

  @media (width > ${variables.md}) {
    border-right: 1px solid;
    border-color: ${variables["bg-light"]};
    min-height: 100vh;
  }
`;
