import { useTheme } from 'styled-components';
import { FiArrowDownCircle, FiArrowUpCircle, FiDollarSign } from 'react-icons/fi';

import {
  Container,
  Header,
  Value,
} from './styles';

interface HighlightCardProps {
  type: 'deposit' | 'withdraw' | 'total';
  value: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ type, value }) => {
  const theme = useTheme();

  const icons = {
    deposit: {
      component: <FiArrowUpCircle color={theme.colors.success} />,
      title: 'Entradas',
    },
    withdraw: {
      component: <FiArrowDownCircle color={theme.colors.attention} />,
      title: 'Saídas',
    },
    total: {
      component: <FiDollarSign color={theme.colors.shape} />,
      title: 'Total',
    },
  };

  return (
    <Container type={type}>
      <Header>
        <span>{icons[type].title}</span>
        {icons[type].component}
      </Header>
      <Value>
        {value}
      </Value>
    </Container>
  );
}

export { HighlightCard };