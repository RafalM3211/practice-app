import jsonServer from 'json-server';
import { Low, JSONFile } from 'lowdb';
import { isTitleIsOccupied, addNewPost, getPostById, editPost, authenticateUser } from './utils.mjs';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const adapter = new JSONFile('./db.json');
const db = new Low(adapter);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/posts', async (req, res) => {
  await db.read();
  res.status(200).jsonp(db.data.posts);
});
server.get('/posts/:id', async (req, res) => {
  await db.read();
  const { id } = req.params;
  const post = getPostById(id, db.data);
  res.status(200).jsonp(post);
});

server.post('/posts', async (req, res) => {
  await db.read();
  const post = req.body;
  if (isTitleIsOccupied(post, db.data)) {
    res.status(400).jsonp({ errorMessage: 'TITLE_OCCUPIED', wrongField: 'title' }).end();
  } else {
    addNewPost(post, db);
    res.sendStatus(201);
  }
});
server.put('/posts/:id', async (req, res) => {
  await db.read();
  const newData = req.body;
  const { id } = req.params;
  if (isTitleIsOccupied({ ...newData, id }, db.data)) {
    res.status(400).jsonp({ errorMessage: 'TITLE_OCCUPIED', wrongField: 'title' }).end();
  } else {
    editPost(id, newData, db);
    res.sendStatus(201);
  }
});

server.delete('/posts/:id', async (req, res) => {
  await db.read();
  const { id } = req.params;
  const posts = db.data.posts;
  const postIndex = posts.findIndex((existingPost) => existingPost.id == id);
  if (postIndex == -1) res.status(400).jsonp({ errorMessage: 'POST_DOESNT_EXIST' });
  else {
    posts.splice(postIndex, 1);
    db.write();
    res.sendStatus(204);
  }
});

server.post('/users', async (req, res) => {
  await db.read();
  const user = req.body;
  if (authenticateUser(user, db.data.users)) {
    res.status(200).jsonp({ token: 'asd123' }).end();
  } else {
    res.status(400).jsonp({ errorMessage: 'AUTHENTICATION_FAILED' }).end();
  }
});

server.listen(3000, () => {
  console.log('JSON Server is running');
});
