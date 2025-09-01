interface EditFormTitleProps {
  title: string;
}

const EditFormTitle: React.FC<EditFormTitleProps> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};
export default EditFormTitle;
