import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Placeholder from "@/_components/Placeholder";
import {
  selectHomeMovieAverageRating,
  selectHomeMovieRatings,
  selectHomeSelectedMovie,
} from "@/store/home/selectors";
import variables from "@/styles/_exports.module.scss";
import Image from "@/_components/Image";
import { RootState } from "@/store";
import Rating from "@/_components/Rating";
import PillContainer from "@/_components/PillContainer";
import { ratingToPercentage } from "@/pages/home/helpers";

const MovieDetails = () => {
  const selectedMovie = useSelector(selectHomeSelectedMovie);
  const ratings = useSelector((state: RootState) =>
    selectedMovie?.episode_id
      ? selectHomeMovieRatings(state, selectedMovie.episode_id)
      : []
  );

  const averageRating = useSelector((state: RootState) =>
    selectedMovie?.episode_id
      ? selectHomeMovieAverageRating(state, selectedMovie.episode_id)
      : null
  );

  if (!selectedMovie) {
    return <Placeholder>Select a movie</Placeholder>;
  }

  return (
    <Container className="movie-details">
      <h3 className="movie-details__title">{selectedMovie?.title}</h3>

      <div className="movie-details__body">
        <Image
          key={selectedMovie?.Poster}
          url={selectedMovie?.Poster}
          alt={selectedMovie?.title}
          width={680}
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
