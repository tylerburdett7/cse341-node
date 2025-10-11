// server.js
import 'dotenv/config'; // loads .env
import express from 'express';
import { connectToMongo } from './src/db.js';
import contactsRouter from './src/routes/contacts.js';
import { swaggerDocs } from './src/swagger.js';

const app = express();
app.use(express.json());

// Routes
app.use('/contacts', contactsRouter);

// Swagger docs route
swaggerDocs(app);

const PORT = process.env.PORT || 3000;

(async function start() {
  try {
    await connectToMongo();
    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
      console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
})();
