// Pour gérer les requetes HTTP pour envoie d'images

// import de Multer
const multer = require('multer');

// Dictionnaire MIME TYPE
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

// la destination du fichier
const storage = multer.diskStorage({
  // destination
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // Supprimer les espaces dasn le npm du fichier
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];

    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});
module.exports = multer({ storage }).single('image');
