import { firestores } from '../../../firebase/admin'

export default (req, res) => {
    const {query} = req
    const {id} = query

    firestores
        .collection('devits')
        .doc(id)
        .get()
        .then((doc) => {
            const data = doc.data()
            const id = doc.id
            const {createdAt} = data

            res.json({
                ...data,
                message: data.content,
                id,
                createdAt: +createdAt.toDate()
            })
        })
        .catch(() => {
            res.status(404).end()
        })
}