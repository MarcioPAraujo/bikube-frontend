import { DefaultButton } from '@/components/Buttons/DefaultButton';
import InputComponent from '@/components/Inputs/InputComponent';
import { useForm } from 'react-hook-form';
import {
  PointRegistrationData,
  PointRegistrationSchema,
} from '@/validation/PointRegistration';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import hourMask from '@/utils/masks/hourMask';
import { ButtonsWrapper, FormModal, PointGroup, PointsWrapper } from './styles';
import ModalBackground from '../elements/ModalBackground';
import SuccessModal from '../SuccessModal/SuccessModal';
import WarningModal from '../WarningModal/WarningModal';

interface IPointRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
}
const PointRegistrationModal: React.FC<IPointRegistrationModalProps> = ({
  isOpen,
  onClose,
  mode,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PointRegistrationData>({
    mode: 'onTouched',
    resolver: yupResolver(PointRegistrationSchema),
    defaultValues: {
      entryA: '08:00:00',
      exitA: '12:00:00',
      entryB: '13:00:00',
      exitB: '17:00:00',
    },
  });
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';

  const newEntryA = watch('entryA');
  const newExitA = watch('exitA');
  const newEntryB = watch('entryB');
  const newExitB = watch('exitB');

  const originalEntryA = '08:00:00';
  const originalExitA = '12:00:00';
  const originalEntryB = '13:00:00';
  const originalExitB = '17:00:00';

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleHourInputChange = (
    value: string,
    field: keyof PointRegistrationData,
  ) => {
    const formattedValue = hourMask(value);
    setValue(field, formattedValue);
  };

  const onFormSubmit = (data: PointRegistrationData) => {
    console.log('Form data submitted:', data);
    setSuccessModal(true);
  };

  if (!isOpen) return null;

  if (successModal) {
    return (
      <SuccessModal
        buttonText="Fechar"
        isOpen={successModal}
        title="Successo!"
        message="Sua solicitação de edição de ponto foi enviada com sucesso."
        onClose={() => {
          setSuccessModal(false);
          handleClose();
        }}
      />
    );
  }

  if (warningModal) {
    return (
      <WarningModal
        isOpen={warningModal}
        title="Aviso"
        message="Tem certeza que deseja sair sem salvar as alterações?"
        confirmText="Fechar"
        cancelText="Cancelar"
        onCancel={() => setWarningModal(false)}
        onConfirm={() => {
          setWarningModal(false);
          handleClose();
        }}
      />
    );
  }

  return (
    <ModalBackground>
      <FormModal onSubmit={handleSubmit(onFormSubmit)}>
        {isEditMode && <h2>Solicitar edição</h2>}
        {isViewMode && <h2>Detalhes do registro de ponto</h2>}
        <PointsWrapper>
          <PointGroup>
            <h3>Edição</h3>
            <PointGroup>
              <InputComponent
                id="entry-a"
                labelText="Entrada-A"
                disabled={isViewMode}
                placeholder="HH:MM:SS"
                register={register('entryA', {
                  onChange: e =>
                    handleHourInputChange(e.target.value, 'entryA'),
                })}
                errorMessage={errors.entryA?.message}
              />
              <InputComponent
                id="exit-a"
                labelText="Saída-A"
                disabled={isViewMode}
                placeholder="HH:MM:SS"
                register={register('exitA', {
                  onChange: e => handleHourInputChange(e.target.value, 'exitA'),
                })}
                errorMessage={errors.exitA?.message}
              />
              <InputComponent
                id="entry-b"
                labelText="Entrada-B"
                disabled={isViewMode}
                placeholder="HH:MM:SS"
                register={register('entryB', {
                  onChange: e =>
                    handleHourInputChange(e.target.value, 'entryB'),
                })}
                errorMessage={errors.entryB?.message}
              />
              <InputComponent
                id="exit-b"
                labelText="Saída-B"
                disabled={isViewMode}
                placeholder="HH:MM:SS"
                register={register('exitB', {
                  onChange: e => handleHourInputChange(e.target.value, 'exitB'),
                })}
                errorMessage={errors.exitB?.message}
              />
            </PointGroup>
          </PointGroup>
          <PointGroup>
            <h3>Original</h3>
            <PointGroup>
              <InputComponent
                id="entry_a"
                labelText="Entrada-A"
                value="08:00:00"
                disabled
                classname={newEntryA !== originalEntryA ? 'change' : 'keep'}
              />
              <InputComponent
                id="exit_a"
                labelText="Saída-A"
                value="12:00:00"
                disabled
                classname={newExitA !== originalExitA ? 'change' : 'keep'}
              />
              <InputComponent
                id="entry_b"
                labelText="Entrada-B"
                value="13:00:00"
                disabled
                classname={newEntryB !== originalEntryB ? 'change' : 'keep'}
              />
              <InputComponent
                id="exit_b"
                labelText="Saída-B"
                value="17:00:00"
                disabled
                classname={newExitB !== originalExitB ? 'change' : 'keep'}
              />
            </PointGroup>
          </PointGroup>
        </PointsWrapper>
        <ButtonsWrapper>
          <DefaultButton
            text={isEditMode ? 'Cancelar' : 'Fechar'}
            type="button"
            variant="bordered"
            onClick={() => setWarningModal(true)}
          />
          {isEditMode && (
            <DefaultButton
              text="Enviar solicitação"
              type="submit"
              disabled={!isEditMode}
            />
          )}
        </ButtonsWrapper>
      </FormModal>
    </ModalBackground>
  );
};
export default PointRegistrationModal;
