import React, { useEffect, useState } from 'react'
import type firebase from 'firebase';
import { formatRelative } from 'date-fns'
import * as firebaseApp from "firebase/app";
import Image from 'next/image'
import { Form } from './form';

// let tsDB: firebase.firestore.Firestore;
// interface Props {
//     db: typeof tsDB,
//     user: {
//         photoURL?: string,
//         uid?: string,
//         email?: string,
//     }
// }
interface message {
    id: string;

    title?: string
    photoURL?: string,
    uid?: string,
    email?: string,
    createdAt?: firebase.firestore.Timestamp,

}
interface Props {
    messages?: message[],
    user: {
        photoURL?: string,
        uid?: string,
        email?: string,
    },
    deleteMessage: Function

}

export const Chat: React.FC<Props> = ({ messages, user, deleteMessage }) => {
    // const [messages, setMessages] = useState<message[] | undefined>();
    // const [newMessage, setNewMessage] = useState("");
    const { uid, photoURL } = user;
    // useEffect(() => {
    //     db.collection("messages")
    //         .orderBy("createdAt")
    //         .limit(100)
    //         .onSnapshot((querySnapShot) => {
    //             const data = querySnapShot.docs.map((doc) => ({
    //                 ...doc.data(),
    //                 id: doc.id,
    //             }));

    //             setMessages(data);
    //         });
    // }, [db]);

    // const handleSubmit = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();

    //     db.collection("messages").add({
    //         title: newMessage,
    //         createdAt: firebaseApp.default.firestore.FieldValue.serverTimestamp(),
    //         uid,
    //         photoURL,
    //     });

    //     setNewMessage("");

    //     // scroll down the chat
    // };
    // const deleteMessage = (id: string | undefined) => {
    //     var docRef = db.collection("messages").doc(id);

    //     docRef.get().then((doc) => {
    //         if (doc.exists) {
    //             console.log("Document data:", doc.data());
    //         } else {

    //             console.log("No such document!");
    //         }
    //     }).catch((error) => {
    //         console.log("Error getting document:", error);
    //     });
    // }

    return (
        <>
            {messages?.map((message) => (
                <li key={message.id} className={message.uid === uid ? "sent" : "received"}>
                    <section>
                        {message.photoURL ? (
                            <Image
                                src={message.photoURL}
                                alt="Avatar"
                                width={70}
                                height={70}
                            />
                        ) : null}
                    </section>
                    <section key={message.id} className={message.uid === uid ? "message-blue" : "message-orange"}>
                        {message.uid && message.uid === uid && <button className="btn" onClick={() => { deleteMessage(message.uid) }}>X</button>}
                        <p className="message-content">{message.title}</p>

                        {/* {message.email ? <span>{message.email}</span> : null} */}
                        <br />
                        {message.createdAt?.seconds ? (
                            <span>
                                {formatRelative(
                                    new Date(message.createdAt.seconds * 1000),
                                    new Date()
                                )}
                            </span>
                        ) : null}
                    </section>
                </li>
            ))}
        </>

    )
}
