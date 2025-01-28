const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    biography: { type: String },
    filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }], // References to Movie documents
    awards: [{
        title: { type: String },
        year: { type: Number }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Director', directorSchema);
