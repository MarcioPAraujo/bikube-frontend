import styled from "styled-components";

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #000;
  z-index: 99;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
`;
export const DataContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  color: #fff;
  font-size: 1.6rem;
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;
export const UserName = styled.p`
  font-weight: 600;
  font-size: 1.6rem;
`;
export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  background-color: #fff;
`;
export const MainContainer = styled.main`
  margin-top: 12rem; /* Adjust based on header height */
  padding: 2rem 2rem 2rem 4rem;
  background-color: #f4f4f4;
  min-height: calc(100vh - 12rem); /* Ensure it covers the full height minus header */
`;
