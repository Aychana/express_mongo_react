import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onAddNew }) => {
  return (
    <div className="controls">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par marque ou modèle..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={onAddNew}>
        + Ajouter un smartphone
      </button>
    </div>
  );
};

export default SearchBar;