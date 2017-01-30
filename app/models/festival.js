import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
	name: DS.attr('string'),
	coutry: {
		name: DS.attr('string'),
		city: DS.attr('string'),
		code: DS.attr('string')
	},
	published: DS.attr('boolean'),
	fromDate: DS.attr('Date'),
	toDate: DS.attr('Date'),
	limitVoteDate: DS.attr('Date'),
	isValid: Ember.computed.notEmpty('name'),

	/*
	const host = 'https://raw.githubusercontent.com/elFriki/ember-workshops/final/';
	const festivalsUrl = `${host}resources/festivals.json`;
	https://raw.githubusercontent.com/elFriki/ember-workshops/final/resources/festivals.json

	  {
	  "id": 8,
	  "name": "Nos Alive",
	  "city": "Lisboa",
	  "country": "Portugal",
	  "country-code": "pt",
	  "publicado": 1,
	  "fechaDesde": 1542409200000,
	  "fechaHasta": 1542409200000,
	  "fechaLimite": 1542409200000
	}

	*/
});