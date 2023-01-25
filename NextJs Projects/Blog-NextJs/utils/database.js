import { MongoClient, ObjectId } from "mongodb";

export const dbConnect = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  return client;
};

export const useDatabase = async (client, collection, document) => {
  const db = client.db();
  await db.collection(collection).insertOne(document);
  return db;
};

export const getDocuments = async (client, collection, sort) => {
  const db = client.db();
  const docs = await db.collection(collection).find().sort(sort).toArray();
  return docs;
};

export const getSingleDocument = async (client, collection, id) => {
  const db = client.db();
  const doc = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });
  return doc;
};
