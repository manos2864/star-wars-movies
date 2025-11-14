import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Placeholder from "@/_components/display/Placeholder";
import {
  selectMovieAverageRating,
  selectMovieRatings,
  selectMovieTitle,
  selectSelectedMovie,
} from "@/store/movies/selectors";
import variables from "@/styles/_exports.module.scss";
import Image from "@/_components/display/Image";
import { RootState } from "@/store";
import Rating from "@/_components/display/Rating";
import PillContainer from "@/_components/display/PillContainer";
import { ratingToPercentage } from "@/pages/movies/helpers";

const MovieDetails = () => {
  const selectedMovie = useSelector(selectSelectedMovie);
  const ratings = useSelector((state: RootState) =>
    selectedMovie?.episode_id
      ? selectMovieRatings(state, selectedMovie.episode_id)
      : []
  );
  const movieTitle = useSelector((state: RootState) =>
    selectedMovie?.episode_id
      ? selectMovieTitle(state, selectedMovie.episode_id)
      : null
  );

  const averageRating = useSelector((state: RootState) =>
    selectedMovie?.episode_id
      ? selectMovieAverageRating(state, selectedMovie.episode_id)
      : null
  );

  if (!selectedMovie) {
    return (
      <Container>
        <Placeholder>Select a movie</Placeholder>
      </Container>
    );
  }

  return (
    <Container className="movie-details">
      <h3 className="movie-details__title">{movieTitle}</h3>

      <div className="movie-details__body">
        <Image
          key={selectedMovie?.Poster}
          url={selectedMovie?.Poster}
          alt={selectedMovie?.title}
          width={150}
          height={250}
        />

        <p>{selectedMovie?.opening_crawl}</p>
      </div>

      <p>Directed By: {selectedMovie?.Director}</p>

      <div className="movie-details__average_rating">
        <span>Average Rating: </span>
        <Rating rating={averageRating} />
      </div>

      <div className="movie-details__ratings">
        {ratings?.map((rating) => (
          <PillContainer className="text-teal">
            {rating.Source}: {ratingToPercentage(rating)}
          </PillContainer>
        ))}
      </div>
    </Container>
  );
};

export default MovieDetails;

const Container = styled.article`
  > * {
    text-align: center;

    @media (width > ${variables.md}) {
      text-align: start;
    }
  }

  margin-block: ${variables.size18};

  @media (width > ${variables.md}) {
    min-height: 100vh;
  }

  .movie-details {
    &__ratings {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: ${variables.size8};
    }

    &__average_rating {
      display: flex;
      align-items: center;
      justify-content: var(--detailed-view-justify-content, center);
      margin-block: ${variables.size12};
      gap: ${variables.size8};

      @media (width > ${variables.md}) {
        --detailed-view-justify-content: start;
      }
    }

    &__body {
      display: flex;
      margin-block: ${variables.size12};
      gap: ${variables.size12};
      flex-direction: column;
      align-items: center;

      @media (width > ${variables.md}) {
        align-items: start;
        flex-direction: row;
      }
    }
  }
`;
