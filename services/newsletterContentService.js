import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/newsletterscontent`;

const addContent = (payload) => {
  const config = {
    method: 'POST',
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateContent = (id, payload) => {
  const config = {
    method: 'PUT',
    url: `${endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getByNewsletterId = (id) => {
  const config = {
    method: 'GET',
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { addContent, updateContent, getByNewsletterId };
