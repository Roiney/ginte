import styled from "styled-components";
import Header from "../../components/Header/Header";
import LoginForm from "./components/LoginForm";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: #333; /* Fundo cinza escuro */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginPage = () => {
  return (
    <Container>
      <Header />
      <ContentWrapper>
        <LoginBox>
          <LoginForm />
        </LoginBox>
      </ContentWrapper>
    </Container>
  );
};

export default LoginPage;
