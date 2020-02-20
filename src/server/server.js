/* eslint-disable consistent-return */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const plantController = require('./controller/plantController')
const userController = require('./controller/userController')
const PORT = 3030;


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "../display/")))

app.get('/landing', plantController.getplantResults, (req, res) => {
  res.status(200).json(res.locals.plants);
});

app.get('/plants', plantController.getUserPlants, (req, res) => {
  res.status(200).json(res.locals.plants);
});

app.patch('/updateplants', plantController.updatePlant, (req, res) => {
  res.status(200).json(res.locals.updatedPlants);
});
app.delete('/deleteplants', plantController.deleteUserPlants, (req, res) => {
  res.status(200).json(res.locals.plants);
});

app.get('/authenticate', userController.oAuthUser, (req, res) => {
  res.json(res.locals.userData);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

app.get('/build/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/bundle.js'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

// if you are in the page and you refresh, this will boot you back to the first page.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../display/index.html'));
});

// Test post request to confirm db is connected -> posted user info to db
app.post('/users', userController.postUser, (req, res) => {
  res.status(200).json();
});

<<<<<<< HEAD
app.post('/plants', plantController.postPlant, (req, res) => {
=======
app.post('/plants', plantController.addPlant, (req, res) => {
>>>>>>> d332093117a1f46a6944af06a9dd0ea5842e34c2
  res.sendStatus(200);
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
// eslint-disable-next-line consistent-return
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.log(err)
  res.sendStatus(500);
}

app.listen(PORT);
console.log((`app listening on ${PORT}`));

module.exports = {
  app
};