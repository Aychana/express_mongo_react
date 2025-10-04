import React from 'react';
import SmartphoneCard from './SmartphoneCard';

const SmartphoneList = ({ smartphones, onEdit, onDelete, loading }) => {
  if (loading) {
    return <div className="loading">Chargement des smartphones...</div>;
  }

  if (!smartphones || smartphones.length === 0) {
    return (
      <div className="loading">
        Aucun smartphone trouvé. Ajoutez le premier smartphone !
      </div>
    );
  }

  return (
    <div className="smartphones-grid">
      {smartphones.map(smartphone => (
        <SmartphoneCard
          key={smartphone._id}
          smartphone={smartphone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SmartphoneList;