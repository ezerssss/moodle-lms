import axios from 'axios';

export async function getUserID(
  moodleURL: string,
  token: string,
): Promise<number> {
  const URL = `${moodleURL}/webservice/rest/server.php`;

  const resp = await axios.get(URL, {
    params: {
      moodlewsrestformat: 'json',
      wstoken: token,
      wsfunction: 'core_webservice_get_site_info',
    },
  });
  const data = resp.data;

  if (data.error) {
    throw new Error(data.error);
  }

  return +data.userid;
}
