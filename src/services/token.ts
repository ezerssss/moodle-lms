import axios from 'axios';

export async function getToken(
  moodleURL: string,
  username: string,
  password: string,
): Promise<string> {
  const URL = `${moodleURL}/login/token.php`;

  const resp = await axios.get(URL, {
    params: { username, password, service: 'moodle_mobile_app' },
  });
  const data = resp.data;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.token;
}
