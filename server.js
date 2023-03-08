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

  // Read the existing data from the file (if any)
  const existingData = fs.readFileSync('src/data/db.json');

  // Parse the existing data as a JSON object
  const data = JSON.parse(existingData);
  console.log(data);

  // Check if the user already exists
  const userExists = data.register.some((entry) => entry.user === user);

  if (userExists) {
    res.status(409).send({message: 'User already exists'});
    return;
  }

  // Add the new user data to the array
  data.register.push({user, password});

  // Write the updated data back to the file
  fs.writeFileSync('src/data/db.json', JSON.stringify(data));

  res.status(200).send({message: 'great!'});
  // req.status(200).send('great!');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

