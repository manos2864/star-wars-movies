import type { FC } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

import variables from "@/styles/_exports.module.scss";
import {
  selectMovie,
  selectMovieAverageRating,
  selectMovieTitle,
  selectSelectedMovieId,
} from "@/store/movies/selectors";
import { type AppDispatch, type RootState } from "@/store";
import { setSelectedMovieId } from "@/store/movies/slice";
import Rating from "@/_components/Rating";

interface ItemProps {
  movieId: number;
}

const Item: FC<ItemProps> = ({ movieId }) => {
  const { episode_id, release_date } = useSelector((state: RootState) =>
    selectMovie(state, movieId)
  );
  const movieTitle = useSelector((state: RootState) =>
    selectMovieTitle(state, episode_id)
  );
  const averageRating = useSelector((state: RootState) =>
    episode_id ? selectMovieAverageRating(state, episode_id) : null
  );
  const selectedMovieId = useSelector(selectSelectedMovieId);
  const isItemSelected = selectedMovieId === movieId;
  const dispatch = useDispatch<AppDispatch>();

  const onItemClick = () => {
    dispatch(setSelectedMovieId(episode_id));
  };

  return (
    <Container
      tabIndex={0}
      onClick={onItemClick}
      aria-selected={isItemSelected}
      className="cursor-pointer fs-regular"
    >
      <div>EPISODE {episode_id}</div>

      <div>{movieTitle}</div>

      <Rating rating={averageRating} />

      <div>{release_date}</div>
    </Container>
  );
};

export default Item;

const Container = styled.li`
  display: grid;
  grid-template-columns: 0.5fr 2.5fr 2fr 0.1fr;
  text-wrap: nowrap;
  align-items: center;
  gap: var(--gap-item, ${variables.size14});
  border-bottom: 1px solid;
  border-color: ${variables["bg-extra-light"]};
  transition: all 0.1s ease-in;

  white-space: nowrap;
  min-width: 800px;

  padding-block: var(--padding-block-list-item, ${variables.size8});
  padding-inline: ${variables.size12};

  &:hover,
  &:focus-visible {
    background-color: ${variables["bg-extra-light"]};
  }

  &:active {
    background-color: ${variables["bg-light"]};
  }

  &[aria-selected="true"] {
    background-color: ${variables["bg-light"]};
  }

  @media (width > ${variables.md}) {
    grid-template-columns: 0.5fr 1fr 0.9fr 0.1fr;
    --padding-block-list-item: ${variables.size16};
    --gap-item: ${variables.size8};
  }
`;
