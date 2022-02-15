const express = require('express');
const { connectDatabase } = require('./config/db');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

connectDatabase(process.env.MONGODB_URI);

app.listen(port, () => console.log(`Server is up and running at ${port}`));
