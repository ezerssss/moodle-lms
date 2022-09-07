import * as S from './styles';

interface StyledTextInputProps {
  isPassword?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function StyledTextInput(props: StyledTextInputProps) {
  const { isPassword, placeholder, onChange } = props;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;

    onChange(value);
  }

  const inputType = isPassword ? 'password' : 'text';

  return (
    <S.Input
      placeholder={placeholder}
      type={inputType}
      onChange={handleChange}
    />
  );
}
