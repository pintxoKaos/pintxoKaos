import Ember from 'ember';


export default Ember.Controller.extend({
	languages: [{
		name: 'ES',
		code: 'es',
		flagUrl: '/assets/images/Spain.jpg'
	}, {
		name: 'UK',
		code: 'en',
		flagUrl: '/assets/images/United_Kingdom.jpg'
	}, {
		name: 'FR',
		code: 'fr',
		flagUrl: '/assets/images/France.jpg'
	}, {
		name: 'PT',
		code: 'pt',
		flagUrl: '/assets/images/Portugal.jpg'
	}, {
		name: 'CT',
		code: 'zh',
		flagUrl: '/assets/images/Estelada_blava.svg.png'
		/*flagUrl: 'http://www.sciencekids.co.nz/images/pictures/flags680/China.jpg'*/
	}],

	ready: function() {
		var image = document.getElementById('background');
		image.onload = function() {
			var engine = new RainyDay({
				image: this,
				blur: 10,
				opacity: 3,
				gravityAngle: Math.PI / 2,
				gravityAngleVariance: 0
			});

			engine.gravity = engine.GRAVITY_NON_LINEAR;
			engine.trail = engine.TRAIL_SMUDGE; //engine.trail = engine.TRAIL_DROPS

			engine.rain([
				[0, 3, 8],
				[3, 8, 1]
			], 50);
		};
		image.crossOrigin = 'anonymous';
		image.src = '/assets/images/bg.jpg';
	},


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
		quellueva(){
			var image = document.getElementById('background');
			//console.log(image.id);
			image.onload = function() {
				var engine = new RainyDay({
					image: this,
					blur: 10,
					opacity: 3,
					gravityAngle: Math.PI / 2,
					gravityAngleVariance: 0
				});

				engine.gravity = engine.GRAVITY_NON_LINEAR;
				engine.trail = engine.TRAIL_SMUDGE; //engine.trail = engine.TRAIL_DROPS

				engine.rain([
					[0, 3, 8],
					[3, 8, 1]
				], 50);
			};
			image.crossOrigin = 'anonymous';
			image.src = '/assets/images/bg.jpg';
		},

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
