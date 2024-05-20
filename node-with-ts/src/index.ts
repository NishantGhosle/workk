// // src/index.ts
// import express from 'express';
// import userRoutes from './routes/userRoutes';

// const app = express();
// const port = 3000;

// app.use(express.json()); // Middleware to parse JSON
// app.use('/api', userRoutes); // Use the user routes

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });


import express from 'express';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

const app = express();
const port = 3000;

connectDB();

app.use(express.json()); 
app.use('/api', userRoutes); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
