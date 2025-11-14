import styled from "@emotion/styled";
import Filters from "./_components/Filters";
import MainContainer from "./MainContainer";
import variables from "@/styles/_exports.module.scss";
import Logo from "./_components/Logo";

const Movies = () => (
  <Container>
    <Filters />
    <MainContainer />
  </Container>
);

export default Movies;

const Container = styled.main`
  padding-inline: var(--padding-inline-main-container, ${variables.size4});

  @media (width> ${variables.md}) {
    --padding-inline-main-container: ${variables.size32};
  }
`;
