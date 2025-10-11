import styled from 'styled-components';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  width: 100%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  &>: first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &.setores {
    .table-header,
    .table-row {
      grid-template-columns: 1fr;
    }
  }
  &.logs {
    .table-header,
    .table-row {
      grid-template-columns: 1fr 4fr 1fr;
    }
  }
  &.employees {
    .table-header,
    .table-row {
      grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    }
    .table-body > :last-child > div {
      border-radius: 0 0 1rem 1rem;
    }
  }
  &.announcements {
    .table-header,
    .table-row {
      grid-template-columns: 1.5fr 3fr 0.75fr;
    }
    .table-body > :last-child > div {
      border-radius: 0 0 1rem 1rem;
    }
  }
  &.vacations {
    .table-header,
    .table-row {
      grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 2fr;
    }
    .table-body > :last-child > div {
      border-radius: 0 0 1rem 1rem;
    }
  }
  &.my-vacations {
    .table-header,
    .table-row {
      grid-template-columns: 2fr 2fr 1fr;
    }
    .table-body > :last-child > div {
      border-radius: 0 0 1rem 1rem;
    }
  }
`;
