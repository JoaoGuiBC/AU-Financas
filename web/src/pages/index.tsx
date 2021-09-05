import { FiPower } from 'react-icons/fi';
import { HighlightCard } from '../components/HighlightCard';

import {
  Container,
  Header,
  UserInfo,
  Img,
  UserGreetings,
  LogoutButton,
  Content,
  HighlightCardsContainer,
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
        <HighlightCardsContainer>
          <HighlightCard type='deposit' value='R$ 17.400,00' />
          <HighlightCard type='withdraw' value='R$ 1.259,00' />
          <HighlightCard type='total' value='R$ 16.141,00' />
        </HighlightCardsContainer>
        <div>grid</div>
      </Content>
    </Container>
  )
}

export default Home;