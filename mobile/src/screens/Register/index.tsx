import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

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

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

const Register: React.FC = () => {
  const [selectedTransactionType, setSelectedTransactionType] = useState('');
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  async function handleRegister(form: FormData) {
    if (!selectedTransactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria da transação');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: selectedTransactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const storagedData = await AsyncStorage.getItem('@aufinancas:transactions');
      const parsedStoragedData = storagedData ? JSON.parse(storagedData) : [];

      const data = [
        ...parsedStoragedData,
        newTransaction
      ]

      await AsyncStorage.setItem('@aufinancas:transactions', JSON.stringify(data));

      reset();
      setSelectedTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <HookFormInput
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
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

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={isCategoryModalVisible}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setIsCategoryModalVisible(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export { Register };