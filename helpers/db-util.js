import { MongoClient } from 'mongodb'

const { MONGODB_URI } = process.env

export async function connectDatabase(dbName = 'events') {
  const uri =
    dbName && dbName !== undefined && MONGODB_URI.replace('mydb', dbName)

  const client = await MongoClient.connect(uri)

  return client
}

export async function insertDocument(client, collection, document) {
  const db = client.db()

  return await db.collection(collection).insertOne(document)
}

export async function getAllDocuments(client, collection, sort, filter) {
  const db = client.db()

  return await db.collection(collection).find(filter).sort(sort).toArray()
}
