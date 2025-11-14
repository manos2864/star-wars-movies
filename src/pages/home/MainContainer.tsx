import { FC } from "react";
import styled from "@emotion/styled";

import List from "./_components/list";
import variables from "@/styles/_exports.module.scss";
import DetailedView from "./_components/DetailedView";
import useFetchMovies from "./hooks/useFetchMovies";

const MainContainer: FC = () => {
  useFetchMovies();

  return (
    <Container className="position-relative">
      <List />

      <DetailedView />
    </Container>
  );
};

export default MainContainer;

const Container = styled.section`
  width: 100%;
  display: grid;
  padding-block-top: var(--padding-main-container, ${variables.size12});
  grid-template-columns: 1fr;
  gap: ${variables.size16};

  @media (width > ${variables.sm}) {
    grid-template-columns: 2fr 1fr;

    --padding-main-container: ${variables.size32};
  }

  @media (width > ${variables.xl}) {
    grid-template-columns: 1fr 1fr;

    --padding-main-container: ${variables.size32};
  }

  & > * {
    min-width: 0;
  }
`;
