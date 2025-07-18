import styled from "styled-components";

export const Page = styled.div`
  .content {
    min-width: 3.2rem;
    padding-right: 1.6rem;
  }
  .new-announcement-btn {
    margin-top: 1rem;
    margin-left: auto;
  }
`;

export const Content = styled.p`
  min-width: 3.2rem;
  max-width: 500rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.6rem;
`;

export const Header  =styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FiltersContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;

  & > :first-child,
  & > :nth-child(2) {
    width: 20rem;
  }
`;

export const ButtonRow = styled.button`
  border: none;
  background: none;
`;
