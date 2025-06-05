// Importerar React och useState hook för att hantera komponentens tillstånd (state)
import React, { useState } from "react";

// Importerar funktionen CreateMeme som skickar data till Imgflips API för att skapa memes
import CreateMeme from "./imgAPI";

// En funktion med en komponent som ansvarar för att skapa memes baserat på användarens input
function MemeCreator({ templateId, boxCount }) {

    // Skapar en array med tomma strängar beroende på hur många textrutor (inputfält) som meme-mallen har (boxCount)
    const [texts, setTexts] = useState(Array(boxCount).fill(""));

    // State för att visa en alert "Meme sparad!" efter att användaren genererat en meme
    const [showSuccess, setShowSuccess] = useState(false);

    // Denna funktionen körs varje gång användaren skriver i ett textfält 
    const handleChange = (index, value) => {

        // Skapar en kopia av den nuvarandra texts-arrayen (för att inte ändra state direkt)
        const newValues = [...texts];

        // Uppdaterar användarens text i ett specifikt index dvs den korrekta textrutan
        newValues[index] = value;

        // Uppdaterar texts-state med den nya arrayen
        setTexts(newValues);
    };

    // Funktion som körs när användaren klickar på knappen "Generera meme"
    const handleSubmit = (e) => {

        // Förhindrar så att sidan inte laddas om (vilket är ett default-beteende i formulär)
        e.preventDefault();

        // Anropar funktionen för att skapa en meme (detta sker via filen imgAPI där funktionen CreateMeme finns)
        CreateMeme(templateId, texts, () => {

            // Tömmer alla textfält så att dem blir tomma
            setTexts(Array(boxCount).fill(""));

            // Visar bekräftelsen, en alert "Meme sparad!"
            setShowSuccess(true);

            // Ser till att alerten försvinner efter 10 sek (1000 millisekunder)
            setTimeout(() => setShowSuccess(false), 10000);
        });
    };
    
    // Renderar ett formulär
    return (
        <form onSubmit={handleSubmit}>

            {/* Renderar ett textfält för varje textruta som memen har */}
            <div className="d-flex flex-column gap-2 mb-3">
                {texts.map((text, index) => (
                    <input
                        key={index}
                        className="form-control rounded-3 shadow-sm"  
                        placeholder={`Text ${index + 1}`}

                        // Visar användarens text i fältet 
                        value={text}

                        // Uppdaterar det korrekta fältet som användaren skriver i
                        onChange={(e) => handleChange(index, e.target.value)}
                    />
                ))}
            </div>

            {/* Knapp för att skicka formuläret (Generera meme) */}
            <button type="submit" className="btn btn-dark rounded-3 shadow-sm px-4 py-2">Generera meme</button>
        
            {/* Alerten som visas när memen sparats*/}
            {showSuccess && (
                <div className="alert alert-success mt-3 py-2 px-3 rounded-3 shadow-sm" role="alert">
                    Meme sparad!
                </div>
            )}
        </form>
    );
}


export default MemeCreator;