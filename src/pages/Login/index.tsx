import { useState } from 'react';
import CustomButton from '../../components/atoms/CustomButton';
import StyledTextInput from '../../components/atoms/StyledTextInput';
import { PRIMARY_BUTTON_BLUE } from '../../constants/colors';
import { useAppDispatch } from '../../hooks';
import { LoginStateInterface } from '../../interfaces/Login/LoginState';
import { getToken } from '../../services/token';
import { setAuthState } from '../../slices/authSlice';
import { FullScreenWrapper } from '../../styles/globalStyles';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import { HOME_PAGE } from '../../constants/routes';
import { getUserID } from '../../services/user';
import { processURL } from '../../utils/url';
import { getCourses } from '../../services/course';
import { setCourseState } from '../../slices/coursesSlice';
import { getActivitiesByCourse } from '../../services/activities';
import { ActivityInterface } from '../../interfaces/Redux/Activites';
import { ActivityType } from '../../enums/activity.enum';
import {
  setAssignments,
  setForums,
  setQuizzes,
} from '../../slices/activitiesSlice';
import ClipLoader from 'react-spinners/ClipLoader';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [loginState, setLoginState] = useState<LoginStateInterface>({
    moodleLink: '',
    password: '',
    username: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleTextInputChange(key: string, value: string): void {
    const newKeyValuePair: Record<string, string> = {};
    newKeyValuePair[key] = value;

    setLoginState({ ...loginState, ...newKeyValuePair });
  }

  async function handleLoginButtonClick(): Promise<void> {
    setIsLoading(true);
    let { moodleLink, username, password } = loginState;

    try {
      moodleLink = processURL(moodleLink);

      const token = await getToken(moodleLink, username, password);
      const userID = await getUserID(moodleLink, token);

      dispatch(
        setAuthState({
          moodleBaseURL: moodleLink,
          token,
          userID,
          password,
          username,
        }),
      );

      const courses = await getCourses(moodleLink, token, userID);

      dispatch(setCourseState(courses));

      const assignments: ActivityInterface[] = [];
      const quizzes: ActivityInterface[] = [];
      const forums: ActivityInterface[] = [];

      for await (const course of courses) {
        const data = await getActivitiesByCourse(
          moodleLink,
          token,
          course.id,
          userID,
        );

        data.forEach((activity) => {
          if (activity.modname === ActivityType.ASSIGNMENT) {
            assignments.push(activity);
          } else if (activity.modname === ActivityType.QUIZ) {
            quizzes.push(activity);
          } else if (activity.modname === ActivityType.FORUM) {
            forums.push(activity);
          }
        });
      }

      dispatch(setAssignments(assignments));
      dispatch(setQuizzes(quizzes));
      dispatch(setForums(forums));

      navigate(HOME_PAGE);
      setIsLoading(false);
    } catch (err: any) {
      swal.fire('Error', err.message, 'error');
      setIsLoading(false);
    }
  }

  const renderLoading = isLoading && <ClipLoader className="mt-5" />;
  const renderButton = !isLoading && (
    <S.ButtonContainer>
      <CustomButton
        backgroundColor={PRIMARY_BUTTON_BLUE}
        textColor="white"
        onClick={handleLoginButtonClick}
      >
        Sign In
      </CustomButton>
    </S.ButtonContainer>
  );

  return (
    <FullScreenWrapper centerItems flex>
      <S.LoginDiv>
        <p className="font-semibold text-xl -mb-2">MOODLE HUB</p>
        <S.TextInputContainer>
          <p className="mb-3">Moodle Link</p>
          <StyledTextInput
            placeholder="e.g. https://upvisayas.net/lms3/"
            onChange={(value) => handleTextInputChange('moodleLink', value)}
          />
        </S.TextInputContainer>
        <S.TextInputContainer>
          <p className="mb-3">Username</p>
          <StyledTextInput
            placeholder="e.g username@school.gmail"
            onChange={(value) => handleTextInputChange('username', value)}
          />
        </S.TextInputContainer>
        <S.TextInputContainer>
          <p className="mb-3">Password</p>
          <StyledTextInput
            isPassword
            placeholder="Password"
            onChange={(value) => handleTextInputChange('password', value)}
          />
        </S.TextInputContainer>
        {renderButton}
        {renderLoading}
      </S.LoginDiv>
    </FullScreenWrapper>
  );
}
