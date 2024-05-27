import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs, query, Timestamp } from 'firebase/firestore';
import { orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

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
const db = getFirestore(app);

const mapUserFromFirebaseAuthToUser = (user) => {
    if (!user) return null;
    const { displayName, email, photoURL } = user;
    return {
        avatar: photoURL,
        username: displayName,
        email,
        userId: email
    };
}

export const LoginWithGitHub = () => {
    const githubProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githubProvider);
}

export const onAuthStateChanged = (onChange) => {
    return firebaseOnAuthStateChanged(auth, user => {
        const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
        onChange(normalizedUser);
    });
}

export const addDevit = async ({ avatar, content, userId, username, imgUrl }) => {
    try {
        const docRef = await addDoc(collection(db, "devits"), {
            avatar,
            content,
            userId,
            username,
            imgUrl, // Add image URL to the devit
            createdAt: Timestamp.fromDate(new Date()),
            likesCount: 0,
            sharedCount: 0
        });
        return docRef.id;
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchLatestDevits = async () => {
    try {
        const devitsCollection = collection(db, "devits");
        const devitsQuery = query(devitsCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(devitsQuery);
        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            const { createdAt } = data;

            return {
                ...data,
                id,
                createdAt: +createdAt.toDate(),
            };
        });
    } catch (error) {
        console.error("Error fetching devits:", error);
        throw new Error("Failed to fetch devits.");
    }
}

export const uploadImage = (file) => {
    const storage = getStorage(app, 'gs://pruebanext-77b4d.appspot.com');
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask;
}
