import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.primary};
  
  height: 12.5rem;
  padding: 2rem 10rem;
`;

export const UserInfo = styled.div`
  display: flex;
`;

export const Img = styled.img`
  height: 3.5rem;
  border-radius: 10px;
`;

export const UserGreetings = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.shape};

  span {
    font: ${({ theme }) => theme.fonts.regular};
    font-size: 1.25rem;
  }
  
  strong {
    font: ${({ theme }) => theme.fonts.bold};
    font-size: 1.25rem;
  }
`;

export const LogoutButton = styled.button`
  color: ${({ theme }) => theme.colors.secondary};
  background: transparent;
  border: none;

  align-self: flex-start;
  font-size: 1.75rem;
`;

export const Content = styled.div``;