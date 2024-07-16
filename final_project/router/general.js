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
public_users.get("/", async (req, res, next) => {
  try {
    await res.send(JSON.stringify(books, null, 4));
  } catch (error) {
    next(error);
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res, next) {

  req.then(resp => {
    const isbn = resp.params.isbn;    
    res.send(books[isbn])
})

.catch(err => {
    next(err)
});

});

// Get book details based on author
public_users.get("/author/:author", async (req, res, next) => {
  try {
    const author = req.params.author;
    // Filter the books array to find books whose author matches the extracted author parameter
    const filtered_authors = Object.entries(books).filter(([isbn, val]) => {
      return val.author === author;
    });
    res.send(Object.fromEntries(filtered_authors));
  } catch (error) {
    next(error);
  }
});

// Get all books based on title
public_users.get("/title/:title", async (req, res, next) => {
  try {
    const title = req.params.title;

    const filtered_titles = Object.entries(books).filter(([isbn, val]) => {
      return val.title === title;
    });
    res.send(Object.fromEntries(filtered_titles));
  } catch (error) {
    next(error);
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
