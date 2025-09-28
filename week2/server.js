// server.js
import 'dotenv/config'; // loads .env
import express from 'express';
import { connectToMongo } from './src/db.js';
import contactsRouter from './src/routes/contacts.js';

const app = express();
app.use(express.json());
app.use('/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;

(async function start() {
  try {
    await connectToMongo();            // ensure DB connection before accepting requests
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
})();
