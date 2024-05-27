import useUser from "@/hooks/useUser";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { addDevit, uploadImage } from "@/firebase/client";
import { useRouter } from "next/router";
import Head from "next/head";
import {getDownloadURL} from "firebase/storage";
import Avatar from "@/components/Avatar";

const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1,
};
const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
};

export default function ComposeTweet() {
    const user = useUser();
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
    const [task, setTask] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    const handleChange = (e) => {
        const { value } = e.target;
        setMessage(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus(COMPOSE_STATES.LOADING);
        addDevit({
            avatar: user.avatar,
            content: message,
            username: user.username,
            userId: "hardcodeduser",
            imgUrl: imgUrl // Add image URL to the devit
        }).then(() => {
            router.push('/home');
        });
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE);
        const file = e.dataTransfer.files[0];
        const uploadTask = uploadImage(file);
        setTask(uploadTask);
    };

    useEffect(() => {
        if (task) {
            const onProgress = () => {}
            const onError = () => {}
            const onComplete = () => {
                console.log('task5', task.snapshot.ref)
                getDownloadURL(task.snapshot.ref).then((url) => {
                    setImgUrl(url);
                    console.log('task6', url)
                });
            };
            task.on('state_changed', onProgress, onError, onComplete);
        }
    }, [task]);

    const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

    return (
        <>
                <Head>
                    <title>Crear un Devit / Devter</title>
                    <meta name="description" content="Crear un nuevo devit" />
                </Head>
                <section className="form-container" >
                    {user && (
                    <section className="avatar-container">
                        <Avatar src={user.avatar} />
                    </section>
                    )}
                    <form >
                        <textarea 
                            placeholder="¿Qué está pasando?" 
                            onChange={handleChange}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}>
                        </textarea>
                        {imgUrl && 
                        <section className="remove-img"> 
                            <button onClick={() => setImgUrl(null)}>X</button>
                            <img src={imgUrl} alt="image" />
                        </section>}
                        <div>
                            <Button disabled={isButtonDisabled} onClick={handleSubmit}>
                                Devitear
                            </Button>
                        </div>
                    </form>
                </section>
            <style jsx>{`
                div {
                    padding: 15px;
                }
                form {
                    padding: 10px;
                }
                textarea {
                    border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
                        ? "3px dashed #09f"
                        : "3px solid transparent"};
                    border-radius: 10px;
                    font-size: 21px;
                    min-height: 200px;
                    outline: 0;
                    padding: 15px;
                    resize: none;
                    width: 100%;
                }
                button {
                    background: rgba(0,0,0,0.3);
                    border: 0;
                    border-radius: 999px;
                    color: #fff;
                    font-size: 24px;
                    width: 32px;
                    height: 32px;
                    top: 15px;
                    position: absolute;
                    right: 15px;
                }
                img {
                    border-radius: 10px;
                    height: auto;
                    width: 100%;
                }
                .remove-img {
                    position: relative;
                }
                .avatar-container {
                padding-top: 20px;
                padding-left: 10px;
                }
                .form-container {
                align-items: flex-start;
                display: flex;
                }
            `}</style>
        </>
    );
}
