import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 3500;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

app.get('/register', (req, res) => {
  const { user, password } = req.query;
  const existingData = fs.readFileSync('src/data/db.json');
  const data = JSON.parse(existingData);

  if (user === '' || password === ''){
    res.status(403).send({message: 'username or password is missing'})
  }
  
  const userExists = data.register.some((entry) => entry.user === user);
  if (!userExists){
    res.status(404).send({message: 'User is not exist'});
    return;
  }

  const passwordCorrect = data.register.some((entry) => entry.user === user && entry.password == password);
  if (!passwordCorrect){
    res.status(401).send({message: 'Password is not correct'});
    return;
  }

  res.status(200).send(data.register);
});

app.put('/update-tasks', (req, res) => {
  console.log("great!")
  const {user, important_tasks, general_tasks, completed_tasks} = req.body;

  const existingData = fs.readFileSync('src/data/db.json');
  const data = JSON.parse(existingData);
  const userIndex = data.register.findIndex((entry) => entry.user === user);

  if (userIndex === -1) {
    res.status(404).send({ message: 'User not found' });
    return;
  }

  data.register[userIndex].important_tasks = important_tasks;
  data.register[userIndex].general_tasks = general_tasks;
  data.register[userIndex].completed_tasks = completed_tasks;

  fs.writeFileSync('src/data/db.json', JSON.stringify(data));

  res.status(200).send({ message: 'Tasks updated successfully!' });
});

app.post('/register', (req, res) => {
  const { user, password, important_tasks, general_tasks, completed_tasks } = req.body;

  const existingData = fs.readFileSync('src/data/db.json');

  const data = JSON.parse(existingData);

  const userExists = data.register.some((entry) => entry.user === user);
  if (userExists) {
    res.status(409).send({message: 'User already exists'});
    return;
  }

  data.register.push({user, password, important_tasks, general_tasks, completed_tasks});

  fs.writeFileSync('src/data/db.json', JSON.stringify(data));

  res.status(200).send({message: 'great!'});

})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});






