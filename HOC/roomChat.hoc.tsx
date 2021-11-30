import React, { useEffect, useState } from 'react'
import type firebase from 'firebase';
import { formatRelative } from 'date-fns'
import * as firebaseApp from "firebase/app";
import Image from 'next/image'
import { Form } from '../components/form';

import { Chat } from '../components/chat'
let tsDB: firebase.firestore.Firestore;
interface Props {
    db: typeof tsDB,
    user: {
        photoURL?: string,
        uid?: string,
        email?: string,
    }
}
interface message {
    id: string;

    title?: string
    photoURL?: string,
    uid?: string,
    email?: string,
    createdAt?: firebase.firestore.Timestamp,

}

export const RoomChat: React.FC<Props> = ({ db, user }) => {
    const [messages, setMessages] = useState<message[] | undefined>();
    const [newMessage, setNewMessage] = useState("");
    const { uid, photoURL } = user;
    useEffect(() => {
        db.collection("messages")
            .orderBy("createdAt")
            .limit(100)
            .onSnapshot((querySnapShot) => {
                const data = querySnapShot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setMessages(data);
            });
    }, [db]);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        db.collection("messages").add({
            title: newMessage,
            createdAt: firebaseApp.default.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
        });

        setNewMessage("");

        // scroll down the chat
    };
    const deleteMessage = (id: string | undefined) => {
        var docRef = db.collection("messages").doc(id);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {

                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    return (
        <div id="chat_room">
            <Chat messages={messages} user={user} deleteMessage={deleteMessage} />
            <Form handleSubmit={handleSubmit} newMessage={newMessage} setNewMessage={setNewMessage} />

        </div>
    )
}
