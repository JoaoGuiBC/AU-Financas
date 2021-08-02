import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { HookFormInput } from '../../components/Form/HookFormInput';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const Register: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { control, handleSubmit } = useForm();

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      selectedTransactionType,
      category: category.key,
    }

    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <HookFormInput
            name="name"
            control={control}
            placeholder="Nome"
          />
          <HookFormInput
            name="amount"
            control={control}
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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
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