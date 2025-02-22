import { Colors } from '@blueprintjs/core';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.LIGHT_GRAY4};
  color: ${Colors.DARK_GRAY1};
`;

export const InnerContainer = styled.div`
  display: flex;
  height: calc(100vh - 50px);
`;

export const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
`;

export const PageContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 70px 0px 70px;
  gap: 20px;
  background-color: ${Colors.WHITE};
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const ShowOnlyOnMobile = styled.div`
  @media (min-width: 1170px) {
    display: none;
  }
`;

export const ShowOnlyOnDesktop = styled.div<{ $shadow?: boolean }>`
  @media (max-width: 1170px) {
    display: none;
  }
  box-shadow: ${(props) =>
    props.$shadow ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : undefined};
  z-index: ${(props) => (props.$shadow ? 1 : undefined)};
`;

export const HeaderButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
