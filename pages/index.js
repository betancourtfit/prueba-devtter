import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { colors } from '../styles/theme'
import Button from "@/components/Button";
import Github from "@/components/Icons/Github"; 
import { LoginWithGitHub, onAuthStateChanged } from "@/firebase/client";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState(null);
  console.log(user);

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    LoginWithGitHub()
      .then(user => {
        const { displayName, email, photoURL } = user.user;
        console.log(displayName, email, photoURL);
        console.log(user)
        setUser({ displayName, email, photoURL });
      })
      .catch(err => console.log(err));
  }
  useEffect(() => {
    console.log(user); 
  }
  , [user]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={`${styles.main} ${inter.className}`}> */}
      <AppLayout>
        <section> 
          <img src="/devter-logo.png" alt="logo" />
          <h1 className={styles.code}>Devter</h1>
          <h2 className={styles.description}>Talk abour developers</h2>
          <div> 
            {user === null ?
            <Button onClick={handleClick}>
              <Github fill='#fff' width={24} height={24} />
              Login with Github
            </Button>
            : 
            <div>
              <strong>{user.username}</strong>
              <img src={user.avatar} alt={user.username} />
            </div>
            }
          </div>
        </section>
        <Link href="/timeline">timeline</Link>
      </AppLayout>
      {/* </main> */}

      <style jsx>{`
        img {
          width: 120px;
        }

        h1 {
          color: ${colors.primary};
          font-size: 24px;
        }
        
        h2 {
          color: ${colors.secondary};
          font-size: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-items: center;
          place-content: center;
        }
      `}</style>
    
    </>
  );
}
