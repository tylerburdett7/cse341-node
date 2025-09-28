// src/routes/contacts.js
import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const id = req.query.id; // the assignment asked for a query param

    if (id) {
      // validate ObjectId
      if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id format' });
      const doc = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
      if (!doc) return res.status(404).json({ error: 'Contact not found' });
      return res.json(doc);
    }

    // no id → return all documents
    const docs = await db.collection('contacts').find().toArray();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
