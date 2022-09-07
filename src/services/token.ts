import axios from 'axios';

function processURL(url: string): string {
  const processedURL = url.split('/login');

  return processedURL[0];
}

export async function getToken(
  moodleURL: string,
  username: string,
  password: string,
): Promise<string> {
  const URL = `${processURL(moodleURL)}/login/token.php`;

  const resp = await axios.get(URL, {
    params: { username, password, service: 'moodle_mobile_app' },
  });
  const data = resp.data;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.token;
}
