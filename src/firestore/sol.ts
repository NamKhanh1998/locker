import admin from 'firebase-admin'
import { solBubboDb } from '.'

const collection = 'tokens'

const upsert = async (token: any) => {
  const { id } = token

  return await solBubboDb
    .collection(collection)
    .doc(id)
    .set({
      ...token,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
}

const getAll = async () => {
  const snapshot = await solBubboDb.collection(collection).get()

  const tokens: any[] = []
  snapshot.forEach((doc) => {
    tokens.push(doc.data() as any)
  })

  return tokens
}

const remove = async (id: string) => {
  await solBubboDb.collection(collection).doc(id).delete()

  return id
}

const batchUpsert = async (tokens: any) => {
  const batch = solBubboDb.batch()
  tokens.forEach((item: any, index: any) => {
    const itemRef = solBubboDb.collection(collection).doc(item.address)
    batch.set(itemRef, { ...item }, { merge: true })
  })

  await batch.commit()
}

const batchRemove = async (tokens: any) => {
  const batch = solBubboDb.batch()

  tokens.forEach((item: any) => {
    const itemRef = solBubboDb.collection(collection).doc(item.address)
    batch.delete(itemRef)
  })

  await batch.commit()
}

const fsSolBubbo = {
  upsert,
  getAll,
  batchUpsert,
  batchRemove,
  remove,
}

export default fsSolBubbo
