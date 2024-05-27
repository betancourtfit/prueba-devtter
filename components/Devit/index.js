import Avatar from '@/components/Avatar'
import useTimeAgo from '@/hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Devit({  avatar, username, message, id, createdAt, imgUrl  }) {
    const timeago = useTimeAgo(createdAt)
    const router = useRouter()
    const handleClick = (e) => {
        e.preventDefault()
        router.push("/status/[id]",`/status/${id}`)
    }
    return (
        <>
            <article key={id} onClick={handleClick} >
                <div>
                    <Avatar src={avatar} alt={username} />
                </div>
                <section>
                <header> 
                    <strong>{username}</strong>
                    <span> · </span>
                    <Link href={`/status/[id]`} as={`/status/${id}`} >
                        <time>{timeago}</time>
                    </Link>
                </header>
                    <p>{message}</p>
                    {imgUrl && <img src={imgUrl} />}
                </section>
            </article>
            <style jsx>{`
                article {
                    border-bottom: 2px solid #eaf7ff;
                    display: flex;
                    padding: 10px 15px;
                }
                div {
                    padding-right: 10px;
                }

                p {
                    line-height: 1.3125;
                    margin: 0;
                }
                img {
                    border-radius: 10px;
                    height: auto;
                    margin-top: 10px;
                    width: 100%;
                }
            `}</style>
        </>
    )
}