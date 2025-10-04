const Smartphone = require('../models/smartphone');

// Ajouter un smartphone avec id auto-incrément
exports.addSmartphone = async (req, res) => {
  try {
    // Récupérer le smartphone avec le plus grand id existant
    const lastSmartphone = await Smartphone.findOne().sort({ id: -1 }).exec();
    const nextId = lastSmartphone ? lastSmartphone.id + 1 : 1;

    // Création du smartphone avec id incrémenté
    const smartphone = await Smartphone.create({ ...req.body, id: nextId });
    res.status(201).json(smartphone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Récupérer tous les smartphones
exports.getAllSmartphones = async (req, res) => {
    try {
        const smartphones = await Smartphone.find(); // Tous les documents
        res.json(smartphones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un smartphone par ID
exports.getSmartphoneById = async (req, res) => {
    try {
        const smartphone = await Smartphone.findOne({ id: req.params.id });
        if (!smartphone) {
            return res.status(404).json({ message: 'Smartphone non trouvé' });
        }
        res.json(smartphone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un smartphone
exports.updateSmartphone = async (req, res) => {
    try {
        const updatedSmartphone = await Smartphone.findOneAndUpdate(
            { id: req.params.id },    // Trouver par ID
            req.body,                 // Nouveau contenu
            { new: true }             
        );

        if (!updatedSmartphone) {
            return res.status(404).json({ message: 'Smartphone non trouvé' });
        }
        res.json(updatedSmartphone);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un smartphone
exports.deleteSmartphone = async (req, res) => {
    try {
        const deletedSmartphone = await Smartphone.findOneAndDelete({ id: req.params.id });
        if (!deletedSmartphone) {
            return res.status(404).json({ message: 'Smartphone non trouvé' });
        }
        res.json({ message: 'Smartphone supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



