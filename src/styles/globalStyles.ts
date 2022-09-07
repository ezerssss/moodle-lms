import styled from 'styled-components';

interface FullScreenWrapperProps {
  flex?: boolean;
  centerItems?: boolean;
}

export const FullScreenWrapper = styled.div.attrs<FullScreenWrapperProps>({
  className: 'h-screen w-screen bg-gray-100',
})<FullScreenWrapperProps>`
  display: ${(props) => props.flex && 'flex'};
  justify-content: ${(props) => props.centerItems && 'center'};
  align-items: ${(props) => props.centerItems && 'center'};
`;
