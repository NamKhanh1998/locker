import admin from 'firebase-admin'
import { raidenxDb } from '.'

const collection = 'raidenX-tokens'

const upsert = async (token: any) => {
  const { id } = token

  return await raidenxDb
    .collection(collection)
    .doc(id)
    .set({
      ...token,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

const getAll = async () => {
  const snapshot = await raidenxDb.collection(collection).get()

  const tokens: any[] = []
  snapshot.forEach((doc) => {
    tokens.push(doc.data() as any)
  })

  return tokens
}

const remove = async (id: string) => {
  await raidenxDb.collection(collection).doc(id).delete()

  return id
}

const batchUpsert = async (tokens: any) => {
  const batch = raidenxDb.batch()
  tokens.forEach((item: any, index: any) => {
    const itemRef = raidenxDb.collection(collection).doc(item.id)
    batch.set(itemRef, { ...item }, { merge: true })
  })

  await batch.commit()
}

const batchRemove = async (tokens: any) => {
  const batch = raidenxDb.batch()

  tokens.forEach((item: any) => {
    const itemRef = raidenxDb.collection(collection).doc(item.id)
    batch.delete(itemRef)
  })

  await batch.commit()
}

const fsRaidenX = {
  upsert,
  getAll,
  batchUpsert,
  batchRemove,
  remove,
}

export default fsRaidenX
