import axios from "axios";


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

export default CreateMeme;