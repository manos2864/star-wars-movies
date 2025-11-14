import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

import Placeholder from "@/_components/Placeholder";
import variables from "@/styles/_exports.module.scss";
import {
  selectHomeIsLoading,
  selectHomeMovieIds,
} from "@/store/home/selectors";
import Spinner from "@/_components/Spinner";
import Item from "./Item";

const List: FC = () => {
  const movieIds = useSelector(selectHomeMovieIds);
  const isLoading = useSelector(selectHomeIsLoading);
  const isEmpty =
    (Array.isArray(movieIds) && movieIds.length === 0) ||
    !Array.isArray(movieIds);

  return (
    <Container className="position-relative">
      {isLoading ? <Spinner /> : null}

      {isEmpty && !isLoading ? <Placeholder>No Movies</Placeholder> : null}

      {!isEmpty &&
        movieIds.map((movieId) => <Item key={movieId} movieId={movieId} />)}
    </Container>
  );
};

export default List;

const Container = styled.ul`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 100vw;
  overflow-x: auto;
  padding: 0;

  @media (width > ${variables.md}) {
    border-right: 1px solid;
    border-color: ${variables["bg-light"]};
    min-height: 100vh;
  }
`;
