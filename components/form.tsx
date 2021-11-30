import React, { FormEventHandler } from 'react'

interface Props {
    handleSubmit: FormEventHandler,
    newMessage: string,
    setNewMessage: Function
}
export const Form: React.FC<Props> = ({ handleSubmit, newMessage, setNewMessage }) => {
    return (
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
    )
}
