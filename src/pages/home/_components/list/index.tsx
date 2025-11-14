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
    <BorderContainer className="position-relative">
      {isLoading ? <Spinner /> : null}

      <ListContainer>
        {isEmpty && !isLoading ? <Placeholder>No Movies</Placeholder> : null}

        {!isEmpty &&
          movieIds.map((movieId) => <Item key={movieId} movieId={movieId} />)}
      </ListContainer>
    </BorderContainer>
  );
};

export default List;

const ListContainer = styled.ul`
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-x: auto;
  padding: 0;
`;

const BorderContainer = styled.div`
  max-block-size: 100vw;

  @media (width > ${variables.md}) {
    border-right: 1px solid;
    border-color: ${variables["bg-light"]};
    min-block-size: 100vh;
  }
`;
