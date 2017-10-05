var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = Schema(
	{
		first_name: {type: String, required: true, max: 100},
		family_name: {type: String, required: true, max: 100},
		date_of_birth: {type: Date},
		date_of_death: {type: Date},
		
	}
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function(){
	return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function(){
	return '/catalog/author/' + this._id;
});

// Virtual for formatted date of birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
	//return moment(this.date_of_birth).format('MMMM Do, YYYY');
	return this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : 'Unknown';
});

// Virtual for formatted date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
	//return moment(this.date_of_death).format('MMMM Do, YYYY');
	return this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : 'Present';

});
///////////////////////////////////////////////challenge lifespan////////////////////////////////
// Virtual for Author lifespan formatted
AuthorSchema
.virtual('lifespan')
.get(function () {
	let birth = this.date_of_birth;
	let death = this.date_of_death;

	if (birth && death){
		return `${moment(birth).format('MMMM Do, YYYY')} - ${moment(death).format('MMMM Do, YYYY')}`;
	}else if (!birth && death){
		return `Unknown - ${moment(death).format('MMMM Do, YYYY')}`;
	}else if (birth && !death){
		return `${moment(birth).format('MMMM Do, YYYY')} - Present`;
	}else{
		return 'Unknown - Present';
	};
});
////////////////////////////////////////////////////////////////////////////////////////////////
//Export model
module.exports = mongoose.model('Author', AuthorSchema);

