import React, { useState } from 'react';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

const Register: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="Preço"
          />

          <TransactionTypes>
            <TransactionTypeButton
              title="Depósito"
              type="deposit"
              onPress={() => setSelectedTransactionType('deposit')}
              isActive={selectedTransactionType === 'deposit'}
            />
            <TransactionTypeButton
              title="Saque"
              type="withdraw"
              onPress={() => setSelectedTransactionType('withdraw')}
              isActive={selectedTransactionType === 'withdraw'}
            />
          </TransactionTypes>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
}

export { Register };