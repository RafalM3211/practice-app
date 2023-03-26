import { appApi } from '../clients/appApi';
import type { Post, PostData } from '../../globalTypes/globalTypes';
import type { QueryFunction } from 'react-query';

export const getPostsRequest: QueryFunction<Post[]> = async () => {
  return await appApi.get('/posts').then((res) => res?.json());
};

export const getSinglePostRequest: QueryFunction<Post, [id: number, name: string]> = async ({ queryKey }) => {
  try{
    const [id] = queryKey;
  return await appApi.get(`/posts/${id}`).then((res) => res?.json());
  }
  catch{}
};

export const putPostRequest = async (postData: PostData) => {
  return await appApi.post('/posts', postData);
};

export const sendPutRequest = async (post: Post) => {
  const { id, ...values }=post;
  return await appApi.put(`/posts/${id}`, values);
};

export const sendDeleteRequest = async (id: number | string) => {
  return await appApi.delete(`/posts/${id}`);
};
