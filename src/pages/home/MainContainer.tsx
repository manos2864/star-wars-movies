import { FC } from "react";
import styled from "@emotion/styled";

import List from "./_components/list";
import variables from "@/styles/_exports.module.scss";
import DetailedView from "./_components/DetailedView";
import useFetchMovies from "./hooks/useFetchMovies";

const MainContainer: FC = () => {
  useFetchMovies();

  return (
    <Container className="equal-columns position-relative">
      <List />

      <DetailedView />
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
