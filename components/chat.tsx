import React, { useEffect, useState } from 'react'
import type firebase from 'firebase';
import { formatRelative } from 'date-fns'
import * as firebaseApp from "firebase/app";
import Image from 'next/image'

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

    text?: string
    photoURL?: string,
    uid?: string,
    email?: string,
    createdAt?: firebase.firestore.Timestamp,

}

export const Chat: React.FC<Props> = ({ db, user }) => {
    console.log(db)
    const [messages, setMessages] = useState<message[] | undefined>();
    const [newMessage, setNewMessage] = useState("");
    const { uid, email, photoURL } = user;
    console.log(typeof user)

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
            text: newMessage,
            createdAt: firebaseApp.default.firestore.FieldValue.serverTimestamp(),
            uid,
            email,
            photoURL,
        });

        setNewMessage("");

        // scroll down the chat
    };
    const deleteMessage = (id: string) => {
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
                        {/* {message.uid && message.uid === uid && <button onClick={() => { deleteMessage(message.uid) }}>Delete</button>} */}
                        <p className="message-content">{message.text}</p>

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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />

                <button type="submit" disabled={!newMessage}>
                    Send
                </button>
            </form>
        </div>

    )
}
