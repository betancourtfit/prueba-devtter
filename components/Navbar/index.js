import Link from 'next/link'
import Create from '@/components/Icons/Create'
import Home from '@/components/Icons/Home'
import Search from '@/components/Icons/Search'


export default function Navbar() { 
    return (
        <>
            <nav>
                <span>
                    <Link href="/home">
                        <Home width={24} height={24} stroke="#09f" />
                    </Link>
                </span>
                <span>
                    <Link href="/search">
                        <Search width={24} height={24} stroke="#09f" />
                    </Link>
                </span>
                <span>
                    <Link href="/compose/tweet">
                        <Create width={24} height={24} stroke="#09f" />
                    </Link>
                </span>

            </nav>
            <style jsx>{`
            nav {
                    background: #fff;
                    bottom: 0;
                    border-top: 1px solid #eee;
                    height: 49px;
                    display: flex;
                    width: 100%;
                }
                nav span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1 1 auto;
                    height: 100%;
                    cursor: pointer;
                }   
                nav span:hover {
                    background: radial-gradient(#0099ff22 15%, transparent 16%);
                    background-size: 180px 180px;
                    background-position: center;
                }
            `}</style>
        </>
    )
}