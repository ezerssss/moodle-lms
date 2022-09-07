import * as S from './styles';

interface CustomButtonProps {
  backgroundColor?: string;
  children: string | JSX.Element | JSX.Element[];
  textColor?: string;
  onClick: () => void;
}

export default function CustomButton(props: CustomButtonProps) {
  const { backgroundColor, children, textColor, onClick } = props;

  return (
    <S.Button
      backgroundColor={backgroundColor}
      textColor={textColor}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
}
