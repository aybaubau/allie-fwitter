const {
  fetchFweets,
  fetchFweetByIdFromDb,
  insertFweetToDb,
  deleteFweetByIdFromDb,
} = require('../model/fweetOrm');

module.exports = {
  getAllFweetsApi: async (_req, res) => {
    try {
      const fweets = await fetchFweets();
      res.json(fweets);
    } catch (e) {
      console.log(e);
      res.status(400)
        .json(e);
    }
  },
  getFweetByIdApi: async (req, res) => {
    const { fweetId } = req.params;
    try {
      res.json(await fetchFweetByIdFromDb(fweetId));
    } catch (e) {
      console.log('i am broken L:24', e);
      res.status(400)
        .json(e);
    }
  },
  createFweetApi: async (req, res) => {
    const { fweet, userId } = req.body;
    try {
      res.json(await insertFweetToDb(fweet, userId));
    } catch (e) {
      console.log('i am broken L:34', e);
      res.status(400)
        .json(e);
    }
  },
  deleteFweetByIdApi: async (req, res) => {
    const { fweetId } = req.params;
    console.log(fweetId);
    try {
      const fweetToDelete = await fetchFweetByIdFromDb(fweetId);
      if (fweetToDelete.userId !== req.user.id) {
        return res.status(401).send('You are unauthorized to delete this fweet.');
      }
    await deleteFweetByIdFromDb(fweetId);
    return res.json(fweetToDelete);
    } catch (e) {
      console.log('i am broken L:45', e);
      res.status(400)
        .json(e);
    }
  },
};
