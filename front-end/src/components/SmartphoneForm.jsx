import React, { useState, useEffect } from 'react';

const SmartphoneForm = ({ smartphone, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    marque: '',
    modele: '',
    prix: '',
    stock: '',
    couleur: 'Noir',
    image: '',
    ecran: {
      taille: '',
      resolution: '1080x1920',
      type: 'OLED'
    },
    ram: '',
    stockage: '',
    camera: {
      principale: '12',
      frontale: '8'
    },
    batterie: '3000',
    os: 'Android',
    processeur: 'Snapdragon',
    dateSortie: new Date().toISOString().split('T')[0],
    enPromotion: false,
    promotionPourcentage: 0
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (smartphone) {
      // Formater la date pour l'input date
      const smartphoneData = { ...smartphone };
      if (smartphoneData.dateSortie) {
        smartphoneData.dateSortie = new Date(smartphoneData.dateSortie).toISOString().split('T')[0];
      }
      setFormData(smartphoneData);
      setImagePreview(smartphoneData.image || '');
    }
  }, [smartphone]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? Number(value) : 
                   type === 'checkbox' ? checked : value
        }
      }));
    } else {
      const newValue = type === 'checkbox' ? checked : 
                      type === 'number' ? Number(value) : 
                      type === 'date' ? value : value;
      
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));

      // Mettre à jour l'aperçu de l'image
      if (name === 'image') {
        setImagePreview(value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.marque || !formData.modele || !formData.prix || !formData.stock) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onSubmit(formData);
  };

  const resetImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{smartphone ? 'Modifier' : 'Ajouter'} un smartphone</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Section Informations de base */}
          <div className="form-section">
            <h3>Informations de base</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Marque *</label>
                <select
                  name="marque"
                  value={formData.marque}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez une marque</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Apple">Apple</option>
                  <option value="Google">Google</option>
                  <option value="Xiaomi">Xiaomi</option>
                  <option value="OnePlus">OnePlus</option>
                  <option value="Huawei">Huawei</option>
                  <option value="Oppo">Oppo</option>
                  <option value="Vivo">Vivo</option>
                  <option value="Realme">Realme</option>
                  <option value="Motorola">Motorola</option>
                  <option value="Sony">Sony</option>
                  <option value="Nokia">Nokia</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Modèle *</label>
                <input
                  type="text"
                  name="modele"
                  value={formData.modele}
                  onChange={handleChange}
                  placeholder="Galaxy S23 Ultra"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Prix (fcfa) *</label>
                <input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="999.99"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  placeholder="50"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Couleur</label>
                <select name="couleur" value={formData.couleur} onChange={handleChange}>
                  <option value="Noir">Noir</option>
                  <option value="Blanc">Blanc</option>
                  <option value="Bleu">Bleu</option>
                  <option value="Rouge">Rouge</option>
                  <option value="Vert">Vert</option>
                  <option value="Or">Or</option>
                  <option value="Argent">Argent</option>
                  <option value="Violet">Violet</option>
                  <option value="Rose">Rose</option>
                  <option value="Gris">Gris</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Date de sortie</label>
                <input
                  type="date"
                  name="dateSortie"
                  value={formData.dateSortie}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section Image */}
          <div className="form-section">
            <h3>Image du produit</h3>
            <div className="form-group">
              <label>URL de l'image</label>
              <div className="image-input-container">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://exemple.com/image.jpg"
                />
                {formData.image && (
                  <button type="button" className="btn btn-small" onClick={resetImage}>
                    ×
                  </button>
                )}
              </div>
              {imagePreview && (
                <div className="image-preview">
                  <img 
                    src={imagePreview} 
                    alt="Aperçu" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <p className="image-preview-text">Aperçu de l'image</p>
                </div>
              )}
            </div>
          </div>

          {/* Section Spécifications techniques */}
          <div className="form-section">
            <h3>Spécifications techniques</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Système d'exploitation</label>
                <select name="os" value={formData.os} onChange={handleChange}>
                  <option value="Android">Android</option>
                  <option value="iOS">iOS</option>
                  <option value="HarmonyOS">HarmonyOS</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Processeur</label>
                <input
                  type="text"
                  name="processeur"
                  value={formData.processeur}
                  onChange={handleChange}
                  placeholder="Snapdragon 8 Gen 2"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>RAM (GB) *</label>
                <select name="ram" value={formData.ram} onChange={handleChange} required>
                  <option value="">Sélectionnez la RAM</option>
                  <option value="4">4 GB</option>
                  <option value="6">6 GB</option>
                  <option value="8">8 GB</option>
                  <option value="12">12 GB</option>
                  <option value="16">16 GB</option>
                  <option value="18">18 GB</option>
                  <option value="24">24 GB</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Stockage (GB) *</label>
                <select name="stockage" value={formData.stockage} onChange={handleChange} required>
                  <option value="">Sélectionnez le stockage</option>
                  <option value="64">64 GB</option>
                  <option value="128">128 GB</option>
                  <option value="256">256 GB</option>
                  <option value="512">512 GB</option>
                  <option value="1024">1 TB</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Taille écran (pouces) *</label>
                <input
                  type="number"
                  name="ecran.taille"
                  value={formData.ecran.taille}
                  onChange={handleChange}
                  step="0.1"
                  min="4"
                  max="10"
                  placeholder="6.7"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Résolution</label>
                <select name="ecran.resolution" value={formData.ecran.resolution} onChange={handleChange}>
                  <option value="720x1280">HD (720x1280)</option>
                  <option value="1080x1920">Full HD (1080x1920)</option>
                  <option value="1440x2560">Quad HD (1440x2560)</option>
                  <option value="2160x3840">4K (2160x3840)</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type d'écran</label>
                <input
                  type="text"
                  name="ecran.type"
                  value={formData.ecran.type}
                  onChange={handleChange}
                  placeholder="AMOLED, OLED, LCD..."
                />
              </div>
              
              <div className="form-group">
                <label>Batterie (mAh)</label>
                <input
                  type="number"
                  name="batterie"
                  value={formData.batterie}
                  onChange={handleChange}
                  min="1000"
                  placeholder="5000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Caméra principale (MP)</label>
                <input
                  type="number"
                  name="camera.principale"
                  value={formData.camera.principale}
                  onChange={handleChange}
                  min="1"
                  placeholder="50"
                />
              </div>
              
              <div className="form-group">
                <label>Caméra frontale (MP)</label>
                <input
                  type="number"
                  name="camera.frontale"
                  value={formData.camera.frontale}
                  onChange={handleChange}
                  min="1"
                  placeholder="12"
                />
              </div>
            </div>
          </div>

          {/* Section Promotion */}
          <div className="form-section">
            <h3>Promotion</h3>
            <div className="form-row">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="enPromotion"
                    checked={formData.enPromotion}
                    onChange={handleChange}
                  />
                  Mettre en promotion
                </label>
              </div>
              
              {formData.enPromotion && (
                <div className="form-group">
                  <label>Pourcentage de réduction (%)</label>
                  <input
                    type="number"
                    name="promotionPourcentage"
                    value={formData.promotionPourcentage}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="15"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {smartphone ? '💾 Mettre à jour' : '➕ Ajouter'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              ❌ Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SmartphoneForm;