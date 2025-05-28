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

    function CreateMeme(templateId, topText, bottomText) {
        const parameters = new URLSearchParams();
        parameters.append("template_id", templateId);
        parameters.append("username", process.env.REACT_APP_MEME_USERNAME);
        parameters.append("password", process.env.REACT_APP_MEME_PASSWORD);
        parameters.append("text0", topText);
        parameters.append("text1", bottomText);

        axios.post("https://api.imgflip.com/caption_image", parameters)
        .then(res => {
            if (res.data.success) {
                console.log("Generated Meme:", res.data.data.url);
                window.open(res.data.data.url, "_blank");
            } else {
                console.error("API-fel", res.data.error_message);
            }
        })
        .catch(err => console.error("Error creating Meme:", err));
    }

    function MemeCreator({ templateId }) {
        const [topText, setTopText] = useState("");
        const [bottomText, setBottomText] = useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            CreateMeme(templateId, topText, bottomText);
        };
        
        return (
            <form onSubmit={handleSubmit}>
                <input placeholder="Top text" value={topText} onChange={e => setTopText(e.target.value)} />
                <input placeholder="Bottom text" value={bottomText} onChange={e => setBottomText(e.target.value)} />
                <button type="submit">Generera en Meme!</button>
            </form>
        );
    }

    return (
        <div>
            <h2>Meme Generator</h2>
            {memes.slice(0, 10).map(meme => (
                <div key={meme.id}>
                    <img src={meme.url} alt={meme.name} width="300" />
                    <p>{meme.name}</p>
                    <MemeCreator templateId={meme.id} />
                </div>
            ))}
        </div>
    );
}

export default MemeTemplate;
