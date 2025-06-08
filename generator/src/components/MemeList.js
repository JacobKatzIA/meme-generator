// Importetar Axios för HTTP-anrop
import axios from "axios";

// Importerar två React hooks: useEffect och useState
import { useEffect, useState } from "react";

// Importerar komponenter
import MemeCreator from "./MemeCreator"
import RandomMeme from "./ReditMeme";
import SavedMemesModal from "./SavedMemesModal";

// Huvudfunktion som representerar hela webbapplikationen
function MemeTemplate() {
    // State-variabel för memes som hämtas från Imgflips API
    const [memes, setMemes] = useState([]);
    // State-varibel för memes som användaren sparat lokalt
    const [savedMemes, setSavedMemes] = useState([]);


    // HTTP-anrop med axios för att hämta memes från Imgflip API
    useEffect(() => {
        axios.get("https://api.imgflip.com/get_memes")
        .then(res => {
            // Om hämtningen lyckas, uppdatera state med memes
            if (res.data.success) {
                setMemes(res.data.data.memes);
            }
        })
        // Fångar och loggar eventuella fel
        .catch(err => console.error("Error finding memes:", err));
    }, []);

    
    // Funktion som laddar in sparade memes från localStorage
    const loadSavedMemes = () => {
        const saved = JSON.parse(localStorage.getItem("savedMemes")) || [];
        setSavedMemes(saved);
    }

    // Funktion som tillåter användaren att ta bort en sparad meme via index
    const deleteMeme = (indexToDelete) => {
        // Filtrerar bort meme med det specifika indexet
        const updatedMemes = savedMemes.filter((_, index) => index !== indexToDelete);
        setSavedMemes(updatedMemes);
        // Uppdaterar localStorage så att det synkar med state
        localStorage.setItem("savedMemes", JSON.stringify(updatedMemes));
    }
    

    return (
        <div className="container my-4">
            <h2 className="mb-4">Meme Generator</h2>

            {/* Knapp för att visa sparade memes */}
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

            {/* Loopa igenom och visa 20 st memes från Imgflip (från meme 10 till 30)  */}
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

                            {/* Formulär för att skapa ny meme */}
                            <div className="col-md-8 p-4">
                                <MemeCreator templateId={meme.id} boxCount={meme.box_count} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            { /* Modal-komponent som visar sparade memes */}
            <SavedMemesModal savedMemes={savedMemes} onDelete={deleteMeme} />
        </div>
    );
}

// Exporterar funktionen MemeTemplate vilket möjliggör så att den kan användas i App.js
export default MemeTemplate;

