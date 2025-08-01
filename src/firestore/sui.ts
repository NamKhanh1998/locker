import { db } from '.'
import admin from 'firebase-admin'

const collection = 'tokens'

const upsert = async (token: any) => {
  const { address } = token

  return await db
    .collection(collection)
    .doc(address)
    .set({
      ...token,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

const getAll = async () => {
  const snapshot = await db.collection(collection).get()

  const tokens: any[] = []
  snapshot.forEach((doc) => {
    tokens.push(doc.data() as any)
  })

  return tokens
}

const remove = async (address: string) => {
  await db.collection(collection).doc(address).delete()

  return address
}

const batchUpsert = async (tokens: any) => {
  const batch = db.batch()

  tokens.forEach((item: any, index: any) => {
    const itemRef = db.collection(collection).doc(item.address)
    batch.set(itemRef, { ...item }, { merge: true })
  })

  await batch.commit()
}

const batchRemove = async (tokens: any) => {
  const batch = db.batch()

  tokens.forEach((item: any) => {
    const itemRef = db.collection(collection).doc(item.address)
    batch.delete(itemRef)
  })

  await batch.commit()
}

const fsTokens = {
  upsert,
  getAll,
  batchUpsert,
  batchRemove,
  remove,
}

export default fsTokens
