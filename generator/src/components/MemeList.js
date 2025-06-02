import axios from "axios";
import { useEffect, useState } from "react";
import MemeCreator from "./MemeCreator"
import RandomMeme from "./ReditMeme";
import SavedMemesModal from "./SavedMemesModal";

function MemeTemplate() {
    const [memes, setMemes] = useState([]);
    const [savedMemes, setSavedMemes] = useState([]);

    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
        .then(res => {
            if (res.data.success) {
                setMemes(res.data.data.memes);
            }
        })
        .catch(err => console.error("Error finding memes:", err));
    }, []);

    
    const loadSavedMemes = () => {
        const saved = JSON.parse(localStorage.getItem("savedMemes")) || [];
        setSavedMemes(saved);
    }

    const deleteMeme = (indexToDelete) => {
        const updatedMemes = savedMemes.filter((_, index) => index !== indexToDelete);
        setSavedMemes(updatedMemes);
        localStorage.setItem("savedMemes", JSON.stringify(updatedMemes));
    }
    

    return (
        <div className="container my-4">
            <h2 className="mb-4">Meme Generator</h2>

            <button
                className="btn btn-outline-secondary mb-4"
                data-bs-toggle="modal"
                data-bs-target="#savedMemesModal"
                onClick={loadSavedMemes}
            >
                Visa sparade memes
            </button>
            <RandomMeme />
            <h3 className="mb-4">Generera nya memes</h3>

            {memes.slice(10, 30).map(meme => (
                <div key={meme.id} className="mb-4">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="row g-0 align-items-center">
                            <div className="col-md-4 text-center bg-light p-3">
                                <img 
                                    src={meme.url} 
                                    alt={meme.name} 
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "250px", objectFit: "contain" }}
                                />
                                <p className="fw-semibold mt-2 mb-0">{meme.name}</p>
                            </div>
                            <div className="col-md-8 p-4">
                                <MemeCreator templateId={meme.id} boxCount={meme.box_count} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}


            <SavedMemesModal savedMemes={savedMemes} onDelete={deleteMeme} />
        </div>
    );
}

export default MemeTemplate;

