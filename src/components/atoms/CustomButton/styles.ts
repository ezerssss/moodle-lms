import styled from 'styled-components';

interface ButtonProps {
  backgroundColor?: string;
  textColor?: string;
}

export const Button = styled.button.attrs<ButtonProps>({
  className:
    'w-full h-full rounded-lg transition ease-in-out duration-300 hover:ring-2 active:ring-4 hover:ring-blue-400 active:ring-blue-300 border-[1px]',
})<ButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
`;
