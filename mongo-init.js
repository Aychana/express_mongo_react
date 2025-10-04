db = db.getSiblingDB('smartphoneDB');

db.smartphones.insertMany([
  {
    marque: 'Samsung',
    modele: 'Galaxy S23 Ultra',
    prix: 1259,
    stock: 25,
    couleur: 'Noir',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/fr/2302/gallery/fr-galaxy-s23-s918-sm-s918bzkgeub-534866917',
    ecran: { 
      taille: 6.8, 
      resolution: '1440x3088', 
      type: 'Dynamic AMOLED 2X' 
    },
    ram: 12,
    stockage: 512,
    camera: { 
      principale: 200, 
      frontale: 12 
    },
    batterie: 5000,
    os: 'Android',
    processeur: 'Snapdragon 8 Gen 2',
    dateSortie: new Date('2023-02-01'),
    enPromotion: true,
    promotionPourcentage: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    marque: 'Apple',
    modele: 'iPhone 15 Pro',
    prix: 1229,
    stock: 30,
    couleur: 'Titanium Naturel',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846359318',
    ecran: { 
      taille: 6.1, 
      resolution: '1179x2556', 
      type: 'Super Retina XDR' 
    },
    ram: 8,
    stockage: 256,
    camera: { 
      principale: 48, 
      frontale: 12 
    },
    batterie: 3274,
    os: 'iOS',
    processeur: 'A17 Pro',
    dateSortie: new Date('2023-09-01'),
    enPromotion: false,
    promotionPourcentage: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    marque: 'Google',
    modele: 'Pixel 8 Pro',
    prix: 999,
    stock: 15,
    couleur: 'Porcelain',
    image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Pixel_8_Pro_Hero_1140x641.width-1200.format-webp.webp',
    ecran: { 
      taille: 6.7, 
      resolution: '1344x2992', 
      type: 'LTPO OLED' 
    },
    ram: 12,
    stockage: 256,
    camera: { 
      principale: 50, 
      frontale: 10.5 
    },
    batterie: 5050,
    os: 'Android',
    processeur: 'Google Tensor G3',
    dateSortie: new Date('2023-10-01'),
    enPromotion: true,
    promotionPourcentage: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Base de données smartphones initialisée avec succès !');