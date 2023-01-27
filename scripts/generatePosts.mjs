import { Low, JSONFile } from "lowdb";
import { addNewPost } from "../src/server/utils.mjs";

const postsCount = parseInt(process.argv[2]) || 1;
const adapter = new JSONFile("./db.json");
const db = new Low(adapter);

const generatePosts = async (count) => {
  await db.read();
  for (let i = 0; i < count; i++) {
    const postData = generateRandomData();
    addNewPost(postData, db);
  }
};

const generateRandomData = () => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "o",
    "p",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "",
  ];
  let title = "";
  for (let i = 0; i < 30; i++) {
    const randomLetter = letters[Math.floor(Math.random() * 25)];
    title += randomLetter;
  }
  const content =
    "En este post, vamos a ver como generar un texto Lorem Ipsum de la longitud que necesitemos en el editor de código Visual Studio Code. Debemos Librus superus podwyżkus tener especificado el lengu un domini";
  const email = "example@mail.com";
  const zipCode = "42-700";
  return { email, zipCode, title, content };
};

generatePosts(postsCount);

console.log(`Successfully generated ${postsCount} posts`);
