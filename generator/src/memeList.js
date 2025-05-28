import axios from "axios";
import { useEffect, useState } from "react";

function MemeTemplate() {
    const [memes, setMemes] = useState([]);
    const [savedMemes, setSavedMemes] = useState([]);
    const [showSaved, setShowSaved] = useState(false);

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
                const url = res.data.data.url
                console.log("Generated Meme:", url);
                window.open(url, "_blank");

                const saved = JSON.parse(localStorage.getItem("savedMemes")) || [];
                saved.push(url);
                localStorage.setItem("savedMemes", JSON.stringify(saved));   
            } else {
                console.error("API-fel", res.data.error_message);
            }
        })
        .catch(err => console.error("Error creating Meme:", err));
    }

    const loadSavedMemes = () => {
        const saved = JSON.parse(localStorage.getItem("savedMemes")) || [];
        setSavedMemes(saved);
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
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2 mb-2">
                    {texts.map((text, index) => (
                        <div className="col-sm" key={index}>
                            <input 
                                className="form-control"  
                                placeholder={`Text ${index + 1}`}
                                value={text}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <button type="submit">Generera en meme</button>
            </form>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4">Meme Generator</h2>

            <button 
                className="btn btn-outline-secondary mb-4"
                onClick={() => {
                    loadSavedMemes();
                    setShowSaved(!showSaved);
                }}
            >
                {showSaved ? "Dölj sparade memes" : "Visa sparade memes"}
            </button>

            {showSaved && (
                <div className="mb-5">
                    <h3>Sparade Memes</h3>
                    {savedMemes.length === 0 ? (
                        <p>Inga sparade memes ännu.</p>
                    ) : (
                        <div className="row">
                            {savedMemes.map((url, index) => (
                                <div className="col-md-4 mb-3" key={index}>
                                    <img src={url} alt={`Saved meme ${index + 1}`} width="300" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {memes.slice(10, 30).map(meme => (
                <div key={meme.id} className="mb-5 border-bottom pb-3">
                    <img src={meme.url} alt={meme.name} width="300" />
                    <p><strong>{meme.name}</strong></p>
                    <MemeCreator templateId={meme.id} boxCount={meme.box_count} />
                </div>
            ))}
        </div>
    );
}

export default MemeTemplate;
