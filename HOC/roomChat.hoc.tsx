import React, { useEffect, useState } from 'react'
import type firebase from 'firebase';
import * as firebaseApp from "firebase/app";
import { Form } from '../components/form';
import { message } from '../models/Chat'
import { Chat } from '../components/chat'
let tsDB: firebase.firestore.Firestore;
interface Props {
    db: typeof tsDB,
    user: {
        photoURL?: string,
        uid: string,
        email?: string,
    }
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
    };

    const deleteMessage = (id: string | undefined) => {
        db.collection("messages")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!")
            })
            .catch((error) => {
                console.error("Error removing document: ", error)
            })
    }


    return (
        <div id="chat_room">
            <Chat messages={messages} user={user} deleteMessage={deleteMessage} />
            <Form handleSubmit={handleSubmit} newMessage={newMessage} setNewMessage={setNewMessage} />

        </div>
    )
}
