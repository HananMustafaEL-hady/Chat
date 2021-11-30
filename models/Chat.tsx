import type firebase from 'firebase';

export interface message {
    id: string;

    title?: string
    photoURL?: string,
    uid?: string,
    email?: string,
    createdAt?: firebase.firestore.Timestamp,

}
