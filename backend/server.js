const express = require('express');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running at ${port}`));
