import Image from 'next/image';
import { IEmployeeResponse } from '@/interfaces/funcionarios/getListOfEmployeesResponse';
import {
  Front,
  Content,
  FlipCard,
  FlipCardInner,
  ImageContainer,
  Name,
  Back,
  Description,
} from './styled';

interface IEmployeeCardProps {
  name: string;
  employeeData: IEmployeeResponse;
  onClick?: () => void;
  isSelected: boolean;
}
const EmployeeCard: React.FC<IEmployeeCardProps> = ({
  name,
  employeeData,
  onClick,
  isSelected,
}) => {
  const classname = isSelected ? 'selected' : '';
  return (
    <FlipCard onClick={onClick}>
      <FlipCardInner>
        <Front className={classname}>
          <ImageContainer>
            <Image
              src="/images/user-profile-placeholder.jpg"
              alt="Foto de perfil do candidato"
              fill
              style={{ objectFit: 'cover' }}
            />
          </ImageContainer>
          <Content>
            <Name>{name}</Name>
          </Content>
        </Front>
        <Back className={classname}>
          <Description>
            <span>Função</span>: {employeeData.funcao}
          </Description>
          <Description>
            <span>Setor</span>: {employeeData.idsetor.nome}
          </Description>
          <Description>
            <span>Cargo</span>: {employeeData.cargo}
          </Description>
        </Back>
      </FlipCardInner>
    </FlipCard>
  );
};
export default EmployeeCard;
