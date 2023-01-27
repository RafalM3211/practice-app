import { rest } from 'msw';
import { posts } from '../test/fixures.json';

export const handlers = [
  rest.get('http://localhost:3000/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),
  rest.get('http://localhost:3000/posts/:id', (req, res, ctx) => {
    const { id } = req.params;
    const post = getPostById(id);
    return res(ctx.status(200), ctx.json(post));
  }),
  rest.post('http://localhost:3000/posts', async (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.put('http://localhost:3000/posts/:id', async (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.delete('http://localhost:3000/posts/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const postIndex = posts.findIndex((existingPost) => existingPost.id == id);

    posts.splice(postIndex, 1);
    return res(ctx.status(204));
  }),
];

const getPostById = (id) => {
  const post = posts.find((post) => id == post.id);
  return post;
};
