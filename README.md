Projekt Meme-generator

-------------------------

Detta är en meme-generator som låter användare att skapa och generera memes. Till detta används två externa API:er, Imgfilip där man kan kan skapa egna memes genom att använda färdiga mallar 
och lägga till egen text, och Reddits api Gimme för att generera randomiserade memes från subreddits. Webbapplikationen riktar sig mot meme-entusiaster som dagligen använder memes för att 
kommunicera med andra. Med hjälp av Meme-generator kan användaren skräddarsy memes och anpassa dem efter behov, istället för att leta och använda färdiga/standard memes på internet. Har man 
slut på idéer eller bara inte vet vilken meme man vill använda, kan man alltid generera en random meme samt att denna kan användas som inspiration till en egen meme. 

-------------------------

Motivering av ramverk (react)

Vi valde att bygga applikationen i React, ett populärt JavaScript-ramverk för att bygga användargränssnitt. 
React används av stora företag världen över, som exempelvis: Netflix, Facebook och Spotify och är ett bra verktyg att ha goda kunskaper inom när man ska ut på arbetsmarknaden [1]. Enligt 
Stackoverflow Developer Survey väljer 41% av de professionella utvecklarna i deras undersökning att använda 
React som ramverk [2]. Ännu en anledning till att vi valde React var att vi tidigare i kursen haft inlämningsuppgifter och flera föreläsningar som involverade det ramverket.

React är uppbyggt kring idén att en applikation delas in i mindre, återanvändbara komponenter, som små byggklossar. Varje komponent ansvarar för en avgränsad funktion: exempelvis att 
visa ett formulär, en bild eller en knapp, detta gör koden modulär, återanvändbar och lätt att underhålla [1].

Ramverket innehåller många externa bibliotek och tilläggsverktyg som förenklar och effektiviserar utveckling av webbapplikationer. Det är ett skalbart verktyg som gör att 
applikationer enkelt kan byggas ut utan att bli svåra att underhålla. Samt att det finns en stark dokumentation och community som gör det enkelt att hitta lösningar på problem via 
internet [2].

Referenser: 
[1] https://kinsta.com/se/blog/bast-react-handledningar/
[2] https://thecodest.co/sv/blog/for-och-nackdelar-med-att-reagera/

-------------------------

Kom igång gudie!

Installation:
OBS hoppa över detta steg om du redan har Node.js installerat!
  - Navigera till Nodejs.org i valfri webbläsare och ladda ner Node.js som finns på startsidan.
  - Gå sedan in i terminalen och skriv "node -v", funkar på både mac och Windows.
  - Skriv sedan "npm -v", funkar på både mac och Windows.

Kör programmet:
  - Klona detta Github repo till Github desktop.
  - Öppna projektet i valfri text-editor, exempelvis Visual Studio Code.
  - Öppna ett nytt terminalfönster, antingen i Visual Studio Code (rekomenderas) eller operativsystemet.
  - Navigera till mappen "generator" på din dator med terminal-kommandot "cd" (viktigt att du navigerar rätt här för att programmet ska fungera).
  - När du är i mappen "generator" i terminalen måste du installera npm. Detta gör du genom att skriva in "npm install" i terminalen.
  - Nu kan du köra kommandot "npm start" för att starta programmet.
  - Sidan/meme-generatorn öppnas automatiskt i din webbläsare, alternativt att du får klistra in "localhost:3000" som står i terminalfönstret i webbläsaren.

-------------------------

Behöver du hjälp?

Kontakta oss via mail: grupp27@flerplattformsapplikationer.com

-------------------------

Projektansvariga: 
Teo, Jacob och Malcolm
Informationsarkitektprogrammet 




