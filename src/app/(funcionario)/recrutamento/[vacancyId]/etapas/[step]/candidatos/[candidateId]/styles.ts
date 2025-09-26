import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  font-weight: 600;
  margin-bottom: 2.4rem;
`;
export const SectionTitle = styled.h3`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.GRAY.hex_2e2e2e};
  font-weight: 600;
  margin-bottom: 1.6rem;
`;
export const PersonalDataSection = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
`;
export const PersonalDataFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex: 1;

  a {
    color: ${({ theme }) => theme.colors.GRAY.hex_747474};
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
export const SectionsContainer = styled.div`
  width: clamp(30rem, 100%, 120rem);
  margin: 0 auto;
`;
export const Section = styled.section`
  margin-top: 4.8rem;
`;
export const EductationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
`;
export const EducationFields = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 1.6rem;
`;
export const LanguagesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 1.6rem;
`;
export const ProfessinalExperienceFields = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 1fr);
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.GRAY.hex_e2e2e2};
  padding: 1.6rem;
  margin-bottom: 2.4rem;

  & > : first-child,
  & > : last-child {
    grid-column: span 2;
  }
`;
export const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;
