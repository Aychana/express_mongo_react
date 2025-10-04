const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://frontend:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/smartphones', require('./routes/smartphones'));
app.use('/api/health', require('./routes/health'));

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Smartphones fonctionnelle!',
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur:', err);
  res.status(500).json({ 
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'production' ? {} : err 
  });
});

// Connexion à MongoDB avec retry logic
const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connecté à MongoDB');
      app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        console.log(`📍 Environnement: ${process.env.NODE_ENV}`);
      });
    })
    .catch(err => {
      console.error('❌ Erreur de connexion à MongoDB:', err.message);
      console.log('🔄 Nouvelle tentative dans 5 secondes...');
      setTimeout(connectWithRetry, 5000);
    });
};

// Démarrer la connexion
connectWithRetry();

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await mongoose.connection.close();
  process.exit(0);
});