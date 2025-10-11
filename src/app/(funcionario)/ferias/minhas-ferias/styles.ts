import styled from 'styled-components';

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;

  .table {
    margin-top: 0rem;
  }
`;

export const Status = styled.main`
  height: 3rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1.6rem;

  &.approved {
    background-color: #d4edda;
  }
  &.rejected {
    background-color: #f8d7da;
  }
  &.pending {
    background-color: #fff3cd;
  }
`;
