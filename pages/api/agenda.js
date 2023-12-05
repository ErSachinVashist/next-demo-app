import { MongoClient } from 'mongodb';
export default async function agenda(req, res) {
  const MONGODB_URI=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`
  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db('codeacademy'); // Choose a name for your database

    const collection = database.collection('agenda'); // Choose a name for your collection
    if (req.method === 'GET') {
      const data = await collection.find({}).toArray();
      res.status(201).json({ data });
    } else if (req.method === 'POST') {
      const out= await collection.updateOne({ title: req.query.title }, { $set: { "done": req.body.done } });
      res.status(201).json({ message: 'Data saved successfully!' });
    } else {
      res.status(405).json({ message: 'Method not allowed!' });
    }

    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong!' });
  } finally {
    await client.close();
  }
}
