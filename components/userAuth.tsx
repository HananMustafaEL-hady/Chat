import React from 'react'
import { auth, db } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Chat } from './chat';
import { RoomChat } from '../HOC/roomChat.hoc';
export const UserAuth = () => {
    console.log(typeof db, db)


    const [user, setUser] = useState<any>()
    useEffect(() => {
        auth?.onAuthStateChanged((user: any) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);
    console.log(user)

    // sign in
    const signInWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider;
        auth.useDeviceLanguage();

        try {
            await auth.signInWithPopup(provider);
        } catch (error) {
            console.log(error);
        }
    };

    // signout
    const signOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <main>
                {user ? (
                    <>
                        <nav id="sign_out">
                            <button onClick={signOut}>Sign Out</button>
                        </nav>
                        <RoomChat user={user} db={db} />
                    </>
                ) : (
                    <section id="sign_in">
                        <button onClick={signInWithGoogle}>Sign In With Google</button>
                    </section>
                )}

            </main>
        </div>
    )
}
