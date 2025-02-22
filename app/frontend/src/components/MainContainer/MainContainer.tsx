import { ReactNode } from 'react';
import { useAppSelector } from '../../hooks';
import AuthDrawer from '../../views/auth/components/AuthDrawer';
import { AuthState } from '../../views/auth/types';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import MobileMenu from '../MobileMenu/MobileMenu';
import {
  Container,
  // HeaderButtonsWrapper,
  InnerContainer,
  PageContainer,
  PageContainerInner,
  ShowOnlyOnDesktop,
  ShowOnlyOnMobile,
} from './styles';

interface MainContainerProps {
  children: ReactNode;
}
const MainContainer = ({ children }: MainContainerProps) => {
  // const dispatch = useAppDispatch();
  const { session }: AuthState = useAppSelector((state) => state.auth);

  return (
    <>
      <Container>
        <Header
          leftSideChildren={
            <ShowOnlyOnMobile>
              <MobileMenu />
            </ShowOnlyOnMobile>
          }
        />
        <InnerContainer>
          {session.logged && (
            <ShowOnlyOnDesktop $shadow>
              <Menu />
            </ShowOnlyOnDesktop>
          )}
          <PageContainer>
            <PageContainerInner>{children}</PageContainerInner>
          </PageContainer>
        </InnerContainer>
      </Container>
      <AuthDrawer />
    </>
  );
};

export default MainContainer;
