import styled from 'styled-components';

export const QuizzesListWrapper = styled.div.attrs({
  className:
    'w-[90%] max-w-[500px] min-h-[400px] md:max-h-[600px] md:overflow-auto rounded-xl border-[2px] border-gray-200 bg-slate-100 p-4 drop-shadow-md',
})`
  margin: 50px auto !important;
`;

export const MarginDividerDiv = styled.div.attrs({
  className: 'h-8 w-full',
})``;

export const QuizContainer = styled.div.attrs({
  className: 'grid grid-cols-1 gap-4',
})``;

export const Quiz = styled.div.attrs({
  className:
    'bg-white flex w-full h-12 rounded-md border-2 items-center px-2 text-sm',
})``;
