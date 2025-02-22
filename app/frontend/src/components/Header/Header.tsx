import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Minha Aplicação</Title>
    </HeaderContainer>
  );
};

export default Header;
