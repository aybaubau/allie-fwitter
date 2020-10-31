const {
  findAllFweets,
  findFweetByIdQuery,
  insertFweetQuery,
  deleteFweetByIdQuery,
} = require('./fweetQueries');
const connection = require('../config/connection');


// Gets
const fetchFweets = async () => {
  try {
    const [rows] = await connection.query(findAllFweets);
    return rows;
  } catch (e) {
    throw new Error(e);
  }
};

const fetchFweetByIdFromDb = async (fweetId) => {
  try {
    // Returns an array
    // First element in the array are the rows  []
    // 2nd element is information about the db and the fields
    // rows is 1 user in an array
    // [  [ { id: 1, password: 'sasuidgayidgada', username: 'lalal' }] , { ...infoaboutDb } ]
    const [rows] = await connection.query(findFweetByIdQuery, fweetId); //
    // and because ID's are guaranteed to be unique
    //  [ { id: 1, password: 'sasuidgayidgada', username: 'lalal' } ]
    // we know for sure that the first element is the user we found
    return rows[0];
  } catch (e) {
    throw new Error(e);
  }
};

// Insert
const insertFweetToDb = async (fweet, userId) => {
  // going to generate some random String to add on to our hashed password once we start hashing it
  try {
    const [result] = await connection.query(insertFweetQuery, [fweet, userId]);
    return result[0];
  } catch (e) {
    throw new Error(e);
  }
};

//Delete
const deleteFweetByIdFromDb = async (fweetId) => {
  try {
    const deletedFweet = await fetchFweetByIdFromDb(fweetId);
    await connection.query(deleteFweetByIdQuery, fweetId);
    return deletedFweet;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  fetchFweets,
  fetchFweetByIdFromDb,
  insertFweetToDb,
  deleteFweetByIdFromDb,
};
