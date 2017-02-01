import Ember from 'ember';

export default Ember.Controller.extend({
	languages: [{
		name: 'ES',
		code: 'es',
		flagUrl: 'http://www.sciencekids.co.nz/images/pictures/flags680/Spain.jpg'
	}, {
		name: 'UK',
		code: 'en',
		flagUrl: 'http://www.sciencekids.co.nz/images/pictures/flags680/United_Kingdom.jpg'
	}, {
		name: 'FR',
		code: 'fr',
		flagUrl: 'http://www.sciencekids.co.nz/images/pictures/flags680/France.jpg'
	}, {
		name: 'PT',
		code: 'pt',
		flagUrl: 'http://www.sciencekids.co.nz/images/pictures/flags680/Portugal.jpg'
	}, {
		name: 'CT',
		code: 'zh',
		flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Estelada_blava.svg/255px-Estelada_blava.svg.png'
		/*flagUrl: 'http://www.sciencekids.co.nz/images/pictures/flags680/China.jpg'*/
	}],

	selectedLanguage: Ember.computed('languages', 'locale',
		function() {
			return this.languages.findBy('code', this.get('locale'));
		}),

	isMenuOpened: false,

	dropdownOpen: false,

	i18n: Ember.inject.service(),

	moment: Ember.inject.service(),

	locale: Ember.computed.alias('i18n.locale'),

	actions: {

		changeLocale(param) {
				this.get('i18n').set('locale', param);
				this.get('moment').setLocale(param);
				this.toggleProperty('dropdownOpen');
			},

			toggleMenu() {
				this.toggleProperty('isMenuOpened');
			},

			toggleDropdown() {
				this.toggleProperty('dropdownOpen');
			},

			signOut() {
				this.get('session').close();
				this.transitionToRoute('/');
			}
	}
});
