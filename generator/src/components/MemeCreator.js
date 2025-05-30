import React, { useState } from "react";
import axios from "axios";


function MemeCreator({ templateId, boxCount }) {
    const [texts, setTexts] = useState(Array(boxCount).fill(""));
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (index, value) => {
        const newValues = [...texts];
        newValues[index] = value;
        setTexts(newValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CreateMeme(templateId, texts, () => {
            setTexts(Array(boxCount).fill(""));
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 10000);
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-2 mb-3">
                {texts.map((text, index) => (
                    <input
                        key={index}
                        className="form-control rounded-3 shadow-sm"  
                        placeholder={`Text ${index + 1}`}
                        value={text}
                        onChange={(e) => handleChange(index, e.target.value)}
                    />
                ))}
            </div>
            <button type="submit" className="btn btn-dark rounded-3 shadow-sm px-4 py-2">Generera meme</button>
        
            {showSuccess && (
                <div className="alert alert-success mt-3 py-2 px-3 rounded-3 shadow-sm" role="alert">
                    Meme sparad!
                </div>
            )}
        </form>
    );
}


function CreateMeme(templateId, texts, onSuccess) {
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
            
            if (onSuccess) onSuccess();
        } else {
            console.error("API-fel", res.data.error_message);
        }
    })
    .catch(err => console.error("Error creating Meme:", err));
}


export default MemeCreator;