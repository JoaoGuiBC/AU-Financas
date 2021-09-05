import styled from 'styled-components';

interface ContainerProps {
  type: 'deposit' | 'withdraw' | 'total';
}

export const Container = styled.div<ContainerProps>`
  width: 15rem;
  padding: 1rem 1.5rem;

  border-radius: 5px;
  background: ${({ theme, type }) => type === 'total' 
    ? theme.colors.secondary 
    : theme.colors.shape
  };

  color: ${({ theme, type }) => type === 'total' 
    ? theme.colors.shape 
    : theme.colors.title
  };
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  width: 100%;
  margin-bottom: 1rem;

  span {
    font: ${({ theme }) => theme.fonts.regular};
    font-size: 1rem;
  }

  svg {
    font-size: 1.5rem;
  }
`;

export const Value = styled.strong`
  font: ${({ theme }) => theme.fonts.medium};
  font-size: 1.5rem;
`;