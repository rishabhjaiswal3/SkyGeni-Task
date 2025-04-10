import express from 'express';
require('dotenv').config();
const app = express();
const PORT =  process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.send('Hello, TypeScript Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});