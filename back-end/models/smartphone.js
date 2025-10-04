const mongoose = require('mongoose');

const smartphoneSchema = new mongoose.Schema({
  marque: {
    type: String,
    required: [true, 'La marque est obligatoire'],
    trim: true
  },
  modele: {
    type: String,
    required: [true, 'Le modèle est obligatoire'],
    trim: true
  },
  prix: {
    type: Number,
    required: [true, 'Le prix est obligatoire'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Le stock ne peut pas être négatif']
  },
  couleur: {
    type: String,
    default: 'Noir'
  },
  image: {
    type: String,
    default: ''
  },
  ecran: {
    taille: {
      type: Number,
      required: true
    },
    resolution: {
      type: String,
      default: '1080x1920'
    },
    type: {
      type: String,
      default: 'OLED'
    }
  },
  ram: {
    type: Number,
    required: true
  },
  stockage: {
    type: Number,
    required: true
  },
  camera: {
    principale: {
      type: Number,
      default: 12
    },
    frontale: {
      type: Number,
      default: 8
    }
  },
  batterie: {
    type: Number,
    default: 3000
  },
  os: {
    type: String,
    default: 'Android'
  },
  processeur: {
    type: String,
    default: 'Snapdragon'
  },
  dateSortie: {
    type: Date,
    default: Date.now
  },
  enPromotion: {
    type: Boolean,
    default: false
  },
  promotionPourcentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Méthode pour obtenir le prix promotionnel
smartphoneSchema.virtual('prixPromotionnel').get(function() {
  if (this.enPromotion && this.promotionPourcentage > 0) {
    return this.prix * (1 - this.promotionPourcentage / 100);
  }
  return this.prix;
});

// S'assurer que les virtuals sont inclus dans toJSON
smartphoneSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Smartphone', smartphoneSchema);