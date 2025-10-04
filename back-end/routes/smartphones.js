const express = require('express');
const router = express.Router();
const Smartphone = require('../models/smartphone');

// GET - Récupérer tous les smartphones
router.get('/', async (req, res) => {
  try {
    const { marque, minPrix, maxPrix, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    
    // Filtrage par marque
    if (marque) {
      filter.marque = new RegExp(marque, 'i');
    }
    
    // Filtrage par prix
    if (minPrix || maxPrix) {
      filter.prix = {};
      if (minPrix) filter.prix.$gte = Number(minPrix);
      if (maxPrix) filter.prix.$lte = Number(maxPrix);
    }
    
    const smartphones = await Smartphone.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Smartphone.countDocuments(filter);
    
    res.json({
      smartphones,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Récupérer un smartphone par ID
router.get('/:id', async (req, res) => {
  try {
    const smartphone = await Smartphone.findById(req.params.id);
    
    if (!smartphone) {
      return res.status(404).json({ message: 'Smartphone non trouvé' });
    }
    
    res.json(smartphone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Créer un nouveau smartphone
router.post('/', async (req, res) => {
  try {
    const smartphone = new Smartphone(req.body);
    const nouveauSmartphone = await smartphone.save();
    res.status(201).json(nouveauSmartphone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT - Mettre à jour un smartphone
router.put('/:id', async (req, res) => {
  try {
    const smartphone = await Smartphone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!smartphone) {
      return res.status(404).json({ message: 'Smartphone non trouvé' });
    }
    
    res.json(smartphone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Supprimer un smartphone
router.delete('/:id', async (req, res) => {
  try {
    const smartphone = await Smartphone.findByIdAndDelete(req.params.id);
    
    if (!smartphone) {
      return res.status(404).json({ message: 'Smartphone non trouvé' });
    }
    
    res.json({ message: 'Smartphone supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Recherche de smartphones
router.get('/search/:term', async (req, res) => {
  try {
    const { term } = req.params;
    const smartphones = await Smartphone.find({
      $or: [
        { marque: new RegExp(term, 'i') },
        { modele: new RegExp(term, 'i') }
      ]
    });
    
    res.json(smartphones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;