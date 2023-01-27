export const isTitleIsOccupied = (post, db) => {
  const { id, title } = post;
  return !!db.posts.find((existingPost) => existingPost.title == title && existingPost.id != id);
};

export const addNewPost = (post, db) => {
  post.id = getLastIdFrom(db.data) + 1;
  db.data.posts.push(post);
  db.write();
};

const getLastIdFrom = (db) => {
  if (db.posts.length) {
    const lastPost = db.posts[db.posts.length - 1];
    return lastPost.id;
  } else {
    return -1;
  }
};

export const getPostById = (id, db) => {
  const post = db.posts.find((post) => id == post.id);
  return post;
};

export const editPost = (id, newData, db) => {
  const editedPost = getPostById(id, db.data);
  for (const key of Object.keys(newData)) {
    editedPost[key] = newData[key];
  }
  db.write();
};

export const authenticateUser = (user, usersList) => {
  const doesMatch = !!usersList.find(
    (existingUser) => user.login == existingUser.login && user.password == existingUser.password,
  );
  return doesMatch;
};
