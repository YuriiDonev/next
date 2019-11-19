import axios from 'axios';
import { getToken } from '../helpers/get-token.js';

const _request = (url, method='GET', data={}, req) => {
  return new Promise( async (resolve, reject) => {
    try {
      const token = getToken(req);
      const fullUrl = req ? `${process.env.NAMESPACE}${url}` : url;
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

export const getPortfolios = () => (
  _request('/api/v1/portfolios', null, null, null)
);

export const getPortfolioById = (id, req) => (
  _request(`/api/v1/portfolios/${id}`, null, null, req)
);

export const createPortfolio = (data) => (
  _request('/api/v1/portfolios', 'POST', data, null)
);

export const updatePortfolio = (data) => (
  _request(`/api/v1/portfolios/${data._id}`, 'PATCH', data, null)
);

export const deletePortfolio = (id) => (
  _request(`/api/v1/portfolios/${id}`, 'DELETE', null, null)
);
