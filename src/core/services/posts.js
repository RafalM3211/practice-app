import { appApi } from '../clients/appApi';

export const getPostsRequest = async () => {
  return await appApi.get('/posts').then((res) => res.json());
};

export const getSinglePostRequest = async ({ queryKey }) => {
  const [id] = queryKey;
  return await appApi.get(`/posts/${id}`).then((res) => res.json());
};

export const putPostRequest = async (postData) => {
  return await appApi.post('/posts', postData);
};

export const sendPutRequest = async ({ id, values }) => {
  return await appApi.put(`/posts/${id}`, values);
};

export const sendDeleteRequest = async (id) => {
  return await appApi.delete(`/posts/${id}`);
};
