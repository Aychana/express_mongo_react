import React from 'react';

const SmartphoneCard = ({ smartphone, onEdit, onDelete }) => {
  const prixReel = smartphone.prixPromotionnel || smartphone.prix;
  const enPromotion = smartphone.enPromotion && smartphone.promotionPourcentage > 0;

  return (
    <div className="smartphone-card">
      <div className="smartphone-image-container">
        <img 
          src={smartphone.image || '/placeholder-phone.png'} 
          alt={`${smartphone.marque} ${smartphone.modele}`}
          className="smartphone-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300/cccccc/969696?text=📱+Image+Non+Disponible';
          }}
        />
        {enPromotion && (
          <div className="promotion-badge">
            -{smartphone.promotionPourcentage}%
          </div>
        )}
        <div className="stock-badge">
          {smartphone.stock > 0 ? `${smartphone.stock} en stock` : 'Rupture'}
        </div>
      </div>
      
      <div className="smartphone-header">
        <div className="smartphone-title">
          <h3>{smartphone.marque} {smartphone.modele}</h3>
          <p>{smartphone.couleur} • {smartphone.os}</p>
        </div>
        <div className="smartphone-price">
          {enPromotion ? (
            <>
              <span className="price-promotional">{prixReel.toFixed(0)}€</span>
              <span className="price-original">{smartphone.prix}Fcfa</span>
            </>
          ) : (
            <span className="price-normal">{smartphone.prix}Fcfa</span>
          )}
        </div>
      </div>
      
      <div className="smartphone-specs">
        <div className="spec-item">
          <span className="spec-label">📱 Écran:</span>
          <span className="spec-value">{smartphone.ecran.taille}" {smartphone.ecran.type}</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">💾 Mémoire:</span>
          <span className="spec-value">{smartphone.ram}GB RAM / {smartphone.stockage}GB</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">📸 Caméra:</span>
          <span className="spec-value">{smartphone.camera.principale}MP + {smartphone.camera.frontale}MP</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">🔋 Batterie:</span>
          <span className="spec-value">{smartphone.batterie}mAh</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">⚡ Processeur:</span>
          <span className="spec-value">{smartphone.processeur}</span>
        </div>
      </div>
      
      <div className="smartphone-actions">
        <button 
          className="btn btn-edit" 
          onClick={() => onEdit(smartphone)}
        >
          ✏️ Modifier
        </button>
        <button 
          className="btn btn-danger" 
          onClick={() => onDelete(smartphone._id)}
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );
};

export default SmartphoneCard;