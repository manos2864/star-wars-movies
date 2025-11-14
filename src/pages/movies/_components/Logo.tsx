import styled from "@emotion/styled";
import starWarsLogo from "@/assets/generic/star-wars.webp";

const Logo = () => (
  <Container>
    <img src={starWarsLogo} width={250} alt="You are on the Star Wars page" />
  </Container>
);

export default Logo;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
