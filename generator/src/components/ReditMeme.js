import { useState } from "react";
import axios from "axios";

function RandomMeme() {
    const [meme, setMeme] = useState(null);


const fetchRandomMeme = () => {
    axios.get("https://meme-api.com/gimme").then((res) => {
        setMeme(res.data);
    });
};

const saveMeme = () => {
    if (meme && meme.url) {
        const saved = JSON.parse(localStorage.getItem("savedMemes")) || [];
        saved.push(meme.url);
        localStorage.setItem("savedMemes", JSON.stringify(saved));
        alert("Meme Sparad!");
    }
};


return (
    <div className="my-4">
        <h4>Behöver du insperation? Inga problem!</h4>
        <button className="btn btn-outline-success mb-3 " onClick={fetchRandomMeme}>
            Visa en slumpmässig Meme
        </button>

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