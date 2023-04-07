import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/newsletters`;

const getAllPaginate = (pageIndex, pageSize) => {
  const config = {
    method: 'GET',
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addNewsletter = (payload) => {
  const config = {
    method: 'POST',
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config);
};

const updateNewsletter = (id, payload) => {
  const config = {
    method: 'PUT',
    url: `${endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteNewsletter = (id) => {
  const config = {
    method: 'DELETE',
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config)
    .then(() => {
      return { id };
    })
    .catch(onGlobalError);
};

const getNewsletterByCategory = (id, pageIndex, pageSize) => {
  const config = {
    method: 'GET',
    url: `${endpoint}/category/?pageIndex=${pageIndex}&pageSize=${pageSize}&categoryId=${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess);
};

const getNonSubscribed = (pageIndex, pageSize) => {
  const config = {
    method: 'GET',
    url: `${endpoint}/unsubscribed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess);
};

export { getAllPaginate, addNewsletter, updateNewsletter, deleteNewsletter, getNewsletterByCategory, getNonSubscribed };
