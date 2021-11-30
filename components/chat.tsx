import React, { useEffect, useState } from 'react'
import { formatRelative } from 'date-fns'
import Image from 'next/image'
import { message } from '../models/Chat'
import { MessageFC } from './message'
interface Props {
    messages?: message[],
    user: {
        photoURL?: string,
        uid: string,
        email?: string,
    },
    deleteMessage: Function

}

export const Chat: React.FC<Props> = ({ messages, user, deleteMessage }) => {
    const { uid, photoURL } = user;

    return (
        <>
            {messages?.map((message) => (
                <MessageFC key={message.id} message={message} deleteMessage={deleteMessage} uid={uid} />

            ))}
        </>

    )
}
