// src/routes/contacts.js
import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db.js';

const router = express.Router();

// GET all contacts OR one by query param (?id=)
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const id = req.query.id;

    if (id) {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid id format' });
      }
      const doc = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
      if (!doc) return res.status(404).json({ error: 'Contact not found' });
      return res.json(doc);
    }

    const docs = await db.collection('contacts').find().toArray();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new contact
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db.collection('contacts').insertOne(contact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong creating the contact' });
  }
});

// Update an existing contact by ID
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.sendStatus(204); // successful
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong updating the contact' });
  }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }

    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.sendStatus(200); // successful
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong deleting the contact' });
  }
});

export default router;
