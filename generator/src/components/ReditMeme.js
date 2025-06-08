// Importerar useState hook för att hantera komponentens tillstånd (state)
import { useState } from "react";

// Importerar Axios för att kunna göra HTTP-anrop
import axios from "axios";

// En funktion som innehåller en komponenet som hämtar och visar en slumpmässig meme från Gimme API
function RandomMeme() {
    // State-variabel som innehåller den meme som hämtas från API:et
    const [meme, setMeme] = useState(null);

// Funktion som gör ett HTTP-anrop till Gimme API
const fetchRandomMeme = () => {
    axios.get("https://meme-api.com/gimme").then((res) => {
        // Sparar memen från API:et i state-varaiabeln "meme"
        setMeme(res.data);
    });
};

// Funktion som tillåter användaren att spara memen till localStorage
const saveMeme = () => {
    // Kontrollerar om en meme är hämtad och har en korrekt URL
    if (meme && meme.url) {
        // Hämtar sparade memes som tidigare sparats i localStorage
        const saved = JSON.parse(localStorage.getItem("savedMemes")) || [];
        saved.push(meme.url);
        localStorage.setItem("savedMemes", JSON.stringify(saved));
        alert("Meme Sparad!");
    }
};

// Returnerar JSX, som renderas i webbläsaren 
return (
    <div className="my-4">
        <h4>Behöver du insperation? Inga problem!</h4>

        {/* Knappen som visar en en ny slumpmässig meme */}
        <button className="btn btn-outline-success mb-3 " onClick={fetchRandomMeme}>
            Visa en slumpmässig Meme
        </button>

        {/* Visar memens innehåll */}
        {meme && (
       
            <div className="card-p3 shadow-sm">
        
                <img id="memePic" src={meme.url} alt={meme.title} className="img-thumbnail rounded mb-2" />
                
                <p className="fw-semibold">{meme.title}</p>
                
                <button id="randomSave" className="btn btn-dark rounded-3 shadow-sm px-4 py-2" onClick={saveMeme}>
                    Spara Randomiserad Meme 
                </button>
            </div>
            )}
    </div>
    );
}
export default RandomMeme;