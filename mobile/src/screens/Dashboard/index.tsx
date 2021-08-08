import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';

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
  LogoutButton,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export const Dashboard: React.FC = () => {
  const [isAsyncStorageLoading, setIsAsyncStorageloading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const { colors } = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'deposit' | 'withdraw'
  ){
    const lastTransaction = new Date(
    Math.max.apply(Math, collection
    .filter(transaction => transaction.type === type)
    .map(transaction => new Date(transaction.date).valueOf())));

    return `${lastTransaction.getDate()} de ${Intl.DateTimeFormat('pt-BR', {
      month: 'long',
    }).format(lastTransaction)}`;
  }

  async function loadTransactions() {
    const response = await AsyncStorage.getItem('@aufinancas:transactions');
    const data = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenseTotal = 0;

    const formattedData: DataListProps[] = await data.map((transaction: DataListProps) => {
      if (transaction.type === "deposit") {
        entriesTotal += Number(transaction.amount);
      } else {
        expenseTotal += Number(transaction.amount);
      }

      const amount = Number(transaction.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(transaction.date));

      return {
        id: transaction.id,
        name: transaction.name,
        amount,
        type: transaction.type,
        category: transaction.category,
        date,
      }
    });

    const transactionsTotal = entriesTotal - expenseTotal

    setTransactions(formattedData);

    const lastDeposit = getLastTransactionDate(data, 'deposit');
    const lastWithdraw = getLastTransactionDate(data, 'withdraw');

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastDeposit}`,
      },
      expenses: {
        amount: expenseTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última saída dia ${lastWithdraw}`,
      },
      total: {
        amount: transactionsTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: '',
      },
    });

    setIsAsyncStorageloading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Container>
      {
        isAsyncStorageLoading ? (
          <LoadContainer>
            <ActivityIndicator color={colors.primary} size="large" />
          </LoadContainer>
        ) : (
          <>
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
                <LogoutButton onPress={() => { }}>
                  <Icon name="power" />
                </LogoutButton>

              </UserWrapper>
            </Header>

            <HighlightCards
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <HighlightCard
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
                type="deposit"
              />
              <HighlightCard
                title="Saídas"
                amount={highlightData.expenses.amount}
                lastTransaction={highlightData.expenses.lastTransaction}
                type="withdraw"
              />
              <HighlightCard
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
                type="total"
              />
            </HighlightCards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionsList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </Transactions>
          </>
        )
      }
    </Container>
  );
}