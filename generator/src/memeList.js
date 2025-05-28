import axios from "axios";
import { useEffect, useState } from "react";

function MemeTemplate() {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
        .then(res => {
            if (res.data.success) {
                setMemes(res.data.data.memes);
            }
        })
        .catch(err => console.error("Error finding memes:", err));
    }, []);

    return (
        <div>
            <h2>Meme Generator</h2>
            {memes.slice(0, 10).map(meme => (
                <div key={meme.id}>
                    <img src={meme.url} alt={meme.name} width="300" />
                    <p>{meme.name}</p>
                </div>
            ))}
        </div>
    );
}

export default MemeTemplate;