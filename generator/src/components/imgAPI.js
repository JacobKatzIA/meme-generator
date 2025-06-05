// Importerar axios som är ett bibliotek för att göra HTTP-anrop
import axios from "axios";

// Funktion som skapar en meme genom att skicka data till Imgflips API
function CreateMeme(templateId, texts, onSuccess) {

    // Skapara en instans av URLSearchParams för att bygga upp de parametrar som Imgflips API kräver
    const parameters = new URLSearchParams();

    // Lägger till templateId dvs vilken meme-mall som används
    parameters.append("template_id", templateId);

    // Lägger till användarens användarnamn och lösenord (känslig data som ligger i .env-filen)
    parameters.append("username", process.env.REACT_APP_MEME_USERNAME);
    parameters.append("password", process.env.REACT_APP_MEME_PASSWORD);

    // Lägger till varje text till rätt textruta (box) för meme-mallen
    texts.forEach((text, index) => {
        parameters.append(`boxes[${index}][text]`, text);       
    });

    // Gör ett HTTP-anrop (POST-anrop) med alla parametrar till Imgflips API
    axios.post("https://api.imgflip.com/caption_image", parameters)
    .then(res => {

        // Om anropet lyckas
        if (res.data.success) {
            // Hämtar URL till den genererade memen
            const url = res.data.data.url
            console.log("Generated Meme:", url);

            // Öppnar den genererade memen i ett nytt fönster
            window.open(url, "_blank");

            // Sparar URL lokat med hjälp av localStorage
            const saved = JSON.parse(localStorage.getItem("savedMemes")) || [];
            saved.push(url);
            localStorage.setItem("savedMemes", JSON.stringify(saved));
            
            // Om en callback funktion (onSuccess) har skickats med till CreateMeme så körs den efter att memen har skapats och sparats
            if (onSuccess) onSuccess();

            // Körs om API:et får ogitlig data eller fel inloggningsuppgifter
        } else {
            console.error("API-fel", res.data.error_message);
        }
    })
    // Fångar oväntade generella fel
    .catch(err => console.error("Error creating Meme:", err));
}

// Exporterar funktionen så att den kan användas i andra komponenter
export default CreateMeme;