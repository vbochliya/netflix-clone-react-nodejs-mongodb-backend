const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    genre: [{ type: String }],
    directors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }],
    actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    releaseDate: { type: Date },
    duration: { type: Number }, // in minutes
    rating: { type: Number, min: 0, max: 10 },
    videoUrl: { 
        type: Map,
        of: String
    },
    thumbnailUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Movie', movieSchema);



// const newMovie = new Movie({
//     title: 'Example Movie',
//     description: 'An example movie description.',
//     genre: ['Drama', 'Thriller'],
//     cast: ['Actor A', 'Actor B'],
//     director: 'Director Name',
//     releaseDate: new Date('2025-01-01'),
//     duration: 120,
//     rating: 8.5,
//     videoUrl: {
//         '1080': 'http://example.com/video_1080p.mp4',
//         '720': 'http://example.com/video_720p.mp4',
//         '480': 'http://example.com/video_480p.mp4',
//         '360': 'http://example.com/video_360p.mp4',
//     },
//     thumbnailUrl: 'http://example.com/thumbnail.jpg',
// });
