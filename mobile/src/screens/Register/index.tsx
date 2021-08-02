import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

const Register: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

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

          <CategorySelectButton
            title={category.name}
            onPress={() => setIsCategoryModalVisible(true)}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>
      <Modal visible={isCategoryModalVisible}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={() => setIsCategoryModalVisible(false)}
        />
      </Modal>
    </Container>
  );
}

export { Register };