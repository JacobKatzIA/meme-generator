import React from "react";

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
                        {savedMemes.length === 0 ? (
                            <p>Inga sparade memes ännu.</p>
                        ) : (
                            <div className="row">
                                {savedMemes.map((url, index) => (
                                    <div className="col-md-4 mb-3" key={index}>
                                        <div className="card h-100 text-center">
                                            <img 
                                                src={url} 
                                                alt={`Saved meme ${index + 1}`}
                                                className="card-img-top mx-auto d-block"
                                            />
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