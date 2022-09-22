import { useAppSelector } from '../../hooks';
import { selectCourses } from '../../slices/coursesSlice';
import { FullScreenWrapper } from '../../styles/globalStyles';
import ClipLoader from 'react-spinners/ClipLoader';
import * as S from './styles';

export default function QuizzesPage() {
  const { courses } = useAppSelector(selectCourses);

  const renderLoading = !courses.length && <ClipLoader />;

  return (
    <FullScreenWrapper centerItems flex>
      <S.QuizzesListWrapper>
        <p className="text-xl font-bold">Quizzes</p>
        <S.MarginDividerDiv />
        <S.QuizContainer>
          {renderLoading}
          <S.Quiz>stuff</S.Quiz>
        </S.QuizContainer>
      </S.QuizzesListWrapper>
    </FullScreenWrapper>
  );
}
