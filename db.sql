-- Creating the database
DROP DATABASE IF EXISTS movie_ticketing;
CREATE DATABASE IF NOT EXISTS movie_ticketing CHARACTER SET UTF8MB4;

USE movie_ticketing;

-- Creating the user table
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
  userID INT AUTO_INCREMENT NOT NULL,
  userName VARCHAR(50) NOT NULL UNIQUE,
  userPassword VARCHAR(50) NOT NULL,
  userEmail VARCHAR(50) NOT NULL,
  userPhoneNo VARCHAR(50) NOT NULL,
  PRIMARY KEY (userID)
);

-- Creating the whishlist table
DROP TABLE IF EXISTS upcomingWishlist;
CREATE TABLE IF NOT EXISTS upcomingWishlist (
    userID INT NOT NULL,
    movieID VARCHAR(50) NOT NULL,
    PRIMARY KEY (userID, movieID),
    FOREIGN KEY (userID) REFERENCES user(userID)
);

DROP TABLE IF EXISTS currentWishlist;
CREATE TABLE IF NOT EXISTS currentWishlist (
    userID INT NOT NULL,
    movieID VARCHAR(50) NOT NULL,
    PRIMARY KEY (userID, movieID),
    FOREIGN KEY (userID) REFERENCES user(userID)
);

-- Creating the Transaction Table
DROP TABLE IF EXISTS transactions;
CREATE TABLE IF NOT EXISTS transactions (
    transactionID INT AUTO_INCREMENT NOT NULL,
    userID INT NOT NULL,
    movieID VARCHAR(50) NOT NULL,
    totalPrice FLOAT(10) NOT NULL,
    PRIMARY KEY (transactionID),
    FOREIGN KEY (userID) REFERENCES user(userID)
);

-- Creating the Ticket Table
DROP TABLE IF EXISTS ticket;
CREATE TABLE IF NOT EXISTS ticket (
    ticketID INT AUTO_INCREMENT NOT NULL,
    userID INT NOT NULL,
    transactionID INT NOT NULL,
    PRIMARY KEY (ticketID),
    FOREIGN KEY (userID) REFERENCES user(userID),
    FOREIGN KEY (transactionID) REFERENCES transaction(transactionID)
);

-- Creating the Contact Table
DROP TABLE IF EXISTS userMessage;
CREATE TABLE IF NOT EXISTS userMessage (
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    message VARCHAR(300) NOT NULL
);