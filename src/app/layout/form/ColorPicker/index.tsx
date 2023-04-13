import { TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';
import PickerDialog from './PickerDialog';
import converters, { TConvertersType } from './transformer';

interface Props {
  onChange: (...args: any[]) => void;
  convert?: TConvertersType;
}

const ColorPicker: React.FC<Props & TextFieldProps> = ({
  name,
  label,
  placeholder,
  // internalValue,
  value,
  defaultValue,
  convert = TConvertersType.rgba_hex,
  onChange,
  // setValue,
  ...rest
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(defaultValue as string);

  return (
    <>
      <TextField
        name={name}
        // id={id}
        label={label}
        placeholder={placeholder}
        onClick={() => setShowPicker(true)}
        onChange={(e) => {
          setInternalValue(e.target.value);
          onChange(e.target.value);
        }}
        InputProps={{
          style: {
            color: value === undefined ? internalValue : (value as string),
          },
        }}
        {...rest}
      />
      {showPicker && (
        <PickerDialog
          value={value === undefined ? internalValue : (value as string)}
          onClick={() => {
            setShowPicker(false);
            onChange(value);
          }}
          onChange={(c) => {
            const newValue = converters[convert](c);
            setInternalValue(newValue);
            onChange(newValue);
          }}
        />
      )}
    </>
  );
};

export default ColorPicker;
