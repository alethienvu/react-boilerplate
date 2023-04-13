import { ChromePicker } from 'react-color';

interface Props {
  value: string;
  onClick: (...args: any[]) => void;
  onChange: (...args: any[]) => void;
}

const PickerDialog: React.FC<Props> = ({ value, onClick, onChange }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', zIndex: 2 }}>
        <div
          style={{
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }}
          onClick={onClick}
        />
        <ChromePicker color={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default PickerDialog;
