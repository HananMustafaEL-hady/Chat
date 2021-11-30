import React from 'react'
import { formatRelative } from 'date-fns'
import Image from 'next/image'
import { message } from '../models/Chat'
interface Props {
    message: message,
    deleteMessage: Function,
    uid: string
}
export const MessageFC: React.FC<Props> = ({ message, deleteMessage, uid }) => {
    return (
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
                {message.uid && message.uid === uid && <button className="btn" onClick={() => { deleteMessage(message.id) }}>X</button>}
                <p className="message-content">{message.title}</p>
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
    )
}
