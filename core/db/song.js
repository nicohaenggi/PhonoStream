var _ = require('lodash'),
	Promise = require('bluebird'),
	SongSchema = require('../models').SongSchema;

/** finds matching Job by ID
*/
module.exports.getById = function (id) {
	var query = { _id : id };

	return SongSchema.findOne(query).then(function (song) {
		return Promise.resolve(song);
	}).catch(function (err){
		return Promise.reject(err);
	}); 
}


module.exports.getOne = function (query) {
	return SongSchema.findOne(query).then(function (song){
		return Promise.resolve(song);
	}).catch(function (err){
		return Promise.reject(err);
	});
}


module.exports.get = function (query) {
	return SongSchema.find(query).then(function (songs){
		return Promise.resolve(songs);
	}).catch(function (err){
		return Promise.reject(err);
	});
}

/** creates a new job
*/
module.exports.create = function (data) {
	var song  = new SongSchema(data);

	return song.save().then(function (song){
		return Promise.resolve(song);
	}).catch(function (err){
		return Promise.reject(err);
	});
}

/** deletes a job
*/
module.exports.del = function(id) {
	return SongSchema.findByIdAndRemove(id).then(function (song){
		return Promise.resolve(song);
	}).catch(function (err){
		return Promise.reject(err);
	});
}

module.exports.removeWithQuery = function(query) {
    return SongSchema.remove(query).then(function (song){
        return Promise.resolve();
    }).catch(function (err){
        return Promise.reject(err);
    });
    
    
}

