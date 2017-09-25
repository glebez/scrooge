import promisify from 'es6-promisify';

require('../models/User.js');

export async function savePortfolio(req, res) {
  const user = req.user;
  user.portfolio = req.body.portfolio;
  const save = promisify(user.save, user);
  let saveResult;
  try {
    saveResult = await save();
  } catch (err) {
    res.status(500).send(err);
  }
  res.send(saveResult.portfolio);
}

export function getPortfolio(req, res) {
  const portfolio = req.user.portfolio[0];
  res.send(portfolio);
}
