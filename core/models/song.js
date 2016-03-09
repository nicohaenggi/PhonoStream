module.exports.Schema = function(mongoose) {
	var Schema = mongoose.Schema;

	return new Schema({
        track_id: { type: Number, required: true, unique: true }, 
		createdAt: { type: Date, required: true },
        lastHitAt: {type: Date, required: true},
        songTitle: { type: String, required: true },
        title: { type: String, required: true },
        artist: { type: String, required: true }
	});
}