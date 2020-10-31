const findAllFweets = 'SELECT * FROM fweets;';
const findFweetByIdQuery = 'SELECT * FROM fweets WHERE id = ?;';
const insertFweetQuery = 'INSERT INTO fweets (fweet, userId) VALUES (?, ?);';
const deleteFweetByIdQuery = 'DELETE FROM fweets WHERE id = ?;';

module.exports = {
  findAllFweets,
  findFweetByIdQuery,
  insertFweetQuery,
  deleteFweetByIdQuery,
};
