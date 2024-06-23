import Devit from "@/components/Devit"
import { useEffect, useState } from "react"
import useUser from "@/hooks/useUser"
import { fetchLatestDevits } from "@/firebase/client"
import Link from "next/link"
import Create from "@/components/Icons/Create"
import Home from "@/components/Icons/Home"
import Search from "@/components/Icons/Search"
import Head from "next/head"
import Navbar from "@/components/Navbar"
import { breakpoints } from "@/styles/theme"


export default function HomePage() {
    const user = useUser()
    const [timeline, setTimeline] = useState([])
    useEffect(() => {
        user && fetchLatestDevits().then(setTimeline)

    }, [user])

    return (
        <>
            <Head>
                <title>Inicio / Devter</title>
            </Head>
            <header>
                <h2>Inicio</h2>
            </header>
            <section>
                {timeline.map((devit) => (
                    <Devit key={devit.id} username={devit.username} message={devit.content} avatar={devit.avatar} createdAt={devit.createdAt} imgUrl={devit.imgUrl} id={devit.id} />
                ))
            }
            </section>
            {/* importing Navbar component */}
            <div className="navbar-container">
                < Navbar />
            </div>


            <style jsx>{`
                .navbar-container {
                    width: 100%;
                    max-width: ${breakpoints.mobile}; // Adjust according to your app's layout constraints
                    margin: 0 auto;
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                header {
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    solid: #ccc;
                    height: 50px;
                    display: flex;
                    position: sticky;
                    width: 100%;
                    top: 0;
                    background: #ffffffaa;
                    backdrop-filter: blur(5px);
                }
                h2 {
                    font-size: 21px;
                    font-weight: 800;
                    padding-left: 15px;
                }
                {/* nav {
                    background: #fff;
                    bottom: 0;
                    border-top: 1px solid #eee;
                    height: 49px;
                    position: sticky;
                    width: 100%;
                    display: flex;
                }
                nav span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1 1 auto;
                    height: 100%;
                    width: 50%;
                    cursor: pointer;
                }
                nav span:hover {
                    background: radial-gradient(#0099ff22 15%, transparent 16%);
                    background-size: 180px 180px;
                    background-position: center;
                } */}
            `}</style>
        </>
    )
}