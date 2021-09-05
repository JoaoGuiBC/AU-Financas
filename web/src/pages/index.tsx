import { FiPower } from 'react-icons/fi';

import {
  Container,
  Header,
  UserInfo,
  Img,
  UserGreetings,
  LogoutButton,
  Content,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserInfo>
          <Img src="https://avatars.githubusercontent.com/u/64855040?v=4" />
          <UserGreetings>
            <span>Olá</span>
            <strong>Jonas</strong>
          </UserGreetings>
        </UserInfo>

        <LogoutButton onClick={() => console.log('')}>
          <FiPower />
        </LogoutButton>
      </Header>

      <Content>
        <div>cards</div>
        <div>grid</div>
      </Content>
    </Container>
  )
}

export default Home;