import axios from 'axios';

export async function getToken(
  moodleURL: string,
  token: string,
): Promise<string> {
  const URL = `${moodleURL}/webservice/rest/server.php`;

  const resp = await axios.get(URL, {
    params: {
      moodlewsrestformat: 'json',
      wstoken: token,
      service: 'moodle_mobile_app',
    },
  });
  const data = resp.data;

  if (data.error) {
    throw new Error(data.error);
  }

  return data.token;
}
