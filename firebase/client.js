
import {initializeApp} from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBBASE_API_KEY,
    authDomain: "pruebanext-77b4d.firebaseapp.com",
    projectId: "pruebanext-77b4d",
    storageBucket: "pruebanext-77b4d.appspot.com",
    messagingSenderId: "812821800868",
    appId: "1:812821800868:web:030a5fee971f8183764331",
    measurementId: "G-XR6L3E2EHD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mapUserFromFirebaseAuthToUser = (user) => {
    if (!user) return null;  // Return null if no user is logged in

    const {displayName, email, photoURL} = user;
    return {
        avatar: photoURL,
        username: displayName,
        email
    };
}

export const LoginWithGitHub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider)
}

export const onAuthStateChanged = (onChange) => {
    return firebaseOnAuthStateChanged(auth, user => {
        const normalizedUser = mapUserFromFirebaseAuthToUser(user);
        onChange(normalizedUser);
    }
    );
}