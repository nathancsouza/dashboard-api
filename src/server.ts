import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(morgan('short'));

app.listen(3333, () => {
  console.log('Server started at port: 3333');
});
