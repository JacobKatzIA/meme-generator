// Importerar React 
import React from "react";

// Komponent som visar en modal med sparade memes
// Tar emot två props: "savedMemes" (en array av URL:er) och "onDelete" (en funktion som låter användaren ta bort en meme)
function SavedMemesModal({ savedMemes, onDelete }) {
    return (
        <div className="modal fade" id="savedMemesModal" tabIndex="-1" aria-hidden="true">

            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Sparade Memes</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">

                        {/* Ifall det inte finns några sparade memes */}
                        {savedMemes.length === 0 ? (
                            <p>Inga sparade memes ännu.</p>
                        ) : (
                            <div className="row">
                                
                                {/* Loopar igenom varje sparad meme URL */}
                                {savedMemes.map((url, index) => (
                                    <div className="col-md-4 mb-3" key={index}>
                                        <div className="card h-100 text-center">
                                            <img 
                                                src={url} 
                                                alt={`Saved meme ${index + 1}`}
                                                className="card-img-top mx-auto d-block"
                                            />

                                            {/* Knapp för att ta bort sparad meme */}
                                            <div className="card-body">
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => onDelete (index)}
                                                > 
                                                    Ta bort
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SavedMemesModal;