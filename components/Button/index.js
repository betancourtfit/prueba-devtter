import {colors} from '../../styles/theme.js'

export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick}>
            {children}
            <style jsx>{`
                button {
                    background: ${colors.black};
                    border: 0;
                    color: #fff;
                    border-radius: 9999px;
                    font-size: 16px;
                    padding: 10px 15px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }
                button > :global(svg) {
                    margin-right: 10px;
                }

                button:hover {
                    opacity: 0.7;
                }
            `}</style>
        </button>
    )
}