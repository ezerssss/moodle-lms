import styled from 'styled-components';
import classnames from 'classnames';

interface FullScreenWrapperProps {
  flex?: boolean;
  centerItems?: boolean;
}

export const FullScreenWrapper = styled.div.attrs<FullScreenWrapperProps>(
  ({ flex, centerItems }) => ({
    className: classnames(
      'h-screen w-screen bg-gray-100 overflow-auto float-left',
      flex && 'md:flex',
      centerItems && 'justify-center items-center',
    ),
  }),
)<FullScreenWrapperProps>``;
