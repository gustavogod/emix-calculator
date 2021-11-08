import styled from 'styled-components';
import { Calculator } from '../components';

import logoImg from '../images/emix-logo.png'

export function App() {
  return (
    <Container>
      <Wrapper>
        <LogoBox>
          <img className="logo-img" src={logoImg} alt="E-mix logo"/>
        </LogoBox>
        <Calculator/>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  height: 470px;
  width: 270px;
  border-radius: 2px 2px 0 0;
  border: 2px solid #006A6A;
  background-color: #006A6A;
  box-shadow: 5px 5px 10px rgba(7, 7, 6, 0.3);
`;

const LogoBox = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

