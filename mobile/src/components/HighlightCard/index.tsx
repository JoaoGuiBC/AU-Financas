import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from './styles';

export const HighlightCard: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Content>
        <Amount>R$ 17.400,00</Amount>
        <LastTransaction>Última transação dia 13 de abril</LastTransaction>
      </Content>
    </Container>
  );
}