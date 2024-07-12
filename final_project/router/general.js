const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  res.send(JSON.stringify({ books }, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  // Extract the isbn parameter from the request URL
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  // Extract the author parameter from the request URL
  const author = req.params.author;
  // Filter the books array to find books whose author matches the extracted author parameter
  const filtered_authors = Object.entries(books).filter(([isbn, val]) => {
    return val.author === author
  })
  res.send(Object.fromEntries(filtered_authors))
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;

  const filtered_titles = Object.entries(books).filter(([isbn, val]) => {
    return val.title === title
  })
  res.send(Object.fromEntries(filtered_titles))
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
