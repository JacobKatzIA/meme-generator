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

    function CreateMeme(templateId, texts) {
        const parameters = new URLSearchParams();
        parameters.append("template_id", templateId);
        parameters.append("username", process.env.REACT_APP_MEME_USERNAME);
        parameters.append("password", process.env.REACT_APP_MEME_PASSWORD);

        texts.forEach((text, index) => {
            parameters.append(`boxes[${index}][text]`, text);       
        });

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

    function MemeCreator({ templateId, boxCount }) {
        const [texts, setTexts] = useState(Array(boxCount).fill(""));
        const handleChange = (index, value) => {
            const newValues = [...texts];
            newValues[index] = value;
            setTexts(newValues);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            CreateMeme(templateId, texts);
        };
        
        return (
            <form onSubmit={handleSubmit}>
                {texts.map((text, index) => (
                    <input key={index}
                    placeholder={`Text ${index + 1}`}
                    value={text}
                    onChange={(e) => handleChange(index, e.target.value)} />
            ))}
            <button type="submit">Generera en meme</button>
            </form>
        );
    }

    return (
        <div>
            <h2>Meme Generator</h2>
            {memes.splice(10, 30).map(meme => (
                <div key={meme.id}>
                    <img src={meme.url} alt={meme.name} width="300" />
                    <p>{meme.name}</p>
                    <MemeCreator templateId={meme.id} boxCount={meme.box_count} />
                </div>
            ))}
        </div>
    );
}

export default MemeTemplate;
