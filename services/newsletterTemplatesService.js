import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/newslettertemplates`;

const getAllPaginate = (pageIndex, pageSize) => {
  const config = {
    method: 'GET',
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAll = () => {
  const config = {
    method: 'GET',
    url: endpoint,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllKeys = () => {
  const config = {
    method: 'GET',
    url: `${endpoint}/keys`,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addTemplate = (payload) => {
  const config = {
    method: 'POST',
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateTemplate = (id, payload) => {
  const config = {
    method: 'PUT',
    url: `${endpoint}/${id}`,
    data: payload,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteTemplate = (id) => {
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

const getAllKeysByTemplate = (templateId) => {
  const config = {
    method: 'GET',
    url: `${endpoint}/${templateId}`,
    crossdomain: true,
    headers: { 'Content-Type': 'application/json' },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { getAllPaginate, addTemplate, updateTemplate, deleteTemplate, getAll, getAllKeys, getAllKeysByTemplate };
