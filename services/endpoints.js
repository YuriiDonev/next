import axios from 'axios';
import { getToken } from '../helpers/get-token.js';

const _request = (url, method='GET', data={}, req) => {
  return new Promise( async (resolve, reject) => {
    try {

      const token = getToken(req);

      const fullUrl = req ? `http://localhost:3000${url}` : url;

      const response = await axios({
        method,
        url: fullUrl,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data
      });
      resolve(response.data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export const getSecretData = (req) => (
  _request('/api/v1/secret', null, null, req)
);

// export const getSecretDataServer = (req) => (
//   _request('http://localhost:3000/api/v1/secret', null, null, req)
// );
