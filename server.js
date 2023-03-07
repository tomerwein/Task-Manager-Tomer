import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3500;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { user, password } = req.body;
  console.log(user, password);
  /** TODO: SAVE USER INFORMATION IN JSON FILE.
   * 
   */
  res.status(200).send('great!');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

