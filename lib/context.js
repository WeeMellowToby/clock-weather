import { createContext, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../pages/api/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


export const UserContext = createContext({ user: null, userData: null })


export function useUserData() {
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        let unsubscribe;
        if (user) {
            const ref = doc(db, "Users", user.uid);
            unsubscribe = onSnapshot(ref, (doc) => {
                setUserData(doc.data())
            })
        }
    }, [user]);

    return { user, userData };
}