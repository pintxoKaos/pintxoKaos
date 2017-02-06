import Ember from 'ember';

export default Ember.Route.extend({
	errorMessage: null,

	moment: Ember.inject.service(),

	beforeModel() {
		if (this.get('session')) {
			this.get('session').fetch('password').catch((error) => {
				this.set('errorMessage', error);
			});
		}
		this.get('moment').setLocale('es');
		this.get('moment').setTimeZone('Europe/Madrid');
	},

	actions: {
		onLoad: function() {
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
			image.src = '/assets/images/bg4.jpg';
		},
		accessDenied() {
			this.transitionTo('/');
		},
	},

});