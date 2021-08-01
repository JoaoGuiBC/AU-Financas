import React from 'react';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserName,
} from './styles';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/64855040?v=4' }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Jonas</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />

        </UserWrapper>
      </Header>

    </Container>
  );
}