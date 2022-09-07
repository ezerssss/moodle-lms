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

export default function LoginPage() {
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
    const { moodleLink, username, password } = loginState;

    try {
      const token = await getToken(moodleLink, username, password);

      dispatch(
        setAuthState({
          moodleBaseURL: moodleLink,
          token,
          password,
          username,
        }),
      );

      navigate(HOME_PAGE);
    } catch (err: any) {
      swal.fire('Error', err.message, 'error');
    }
  }

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
        <S.ButtonContainer>
          <CustomButton
            backgroundColor={PRIMARY_BUTTON_BLUE}
            textColor="white"
            onClick={handleLoginButtonClick}
          >
            Sign In
          </CustomButton>
        </S.ButtonContainer>
      </S.LoginDiv>
    </FullScreenWrapper>
  );
}
