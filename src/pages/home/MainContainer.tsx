import { FC } from "react";
import styled from "@emotion/styled";

import { useFetchSwapi } from "@/services/swapi/queries";
import List from "./_components/list";
import Spinner from "@/_components/Spinner";
import variables from "@/styles/_exports.module.scss";
import MovieDetails from "./_components/movie-details";

const MainContainer: FC = () => {
  const { data, isFetching } = useFetchSwapi();

  return (
    <Container className="equal-columns position-relative">
      <div>{isFetching ? <Spinner /> : <List movies={data} />}</div>

      <div>
        <MovieDetails />
      </div>
    </Container>
  );
};

export default MainContainer;

const Container = styled.section`
  width: 100%;
  padding-block: var(--padding, ${variables.size12});

  @media (width > ${variables.md}) {
    --padding: ${variables.size32};
  }
`;
