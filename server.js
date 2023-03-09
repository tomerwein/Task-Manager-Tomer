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

app.post('/register', (req, res) => {
  const { user, password } = req.body;
  console.log(user, password);

  const existingData = fs.readFileSync('src/data/db.json');

  const data = JSON.parse(existingData);
  console.log(data);

  const userExists = data.register.some((entry) => entry.user === user);
  if (userExists) {
    res.status(409).send({message: 'User already exists'});
    return;
  }

  data.register.push({user, password});

  fs.writeFileSync('src/data/db.json', JSON.stringify(data));

  res.status(200).send({message: 'great!'});

})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



