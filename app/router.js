import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  this.route('teams');
  this.route('pintxos');
  this.route('welcome');
  this.authenticatedRoute('vota');


  /*
    this.authenticatedRoute('editions', function() {
      this.route('new');
      this.route('edit', { path: '/:edition_id/edit' });
    });
    this.authenticatedRoute('teams', function() {
      this.route('new');
      this.route('edit', { path: '/:team_id/edit' });
    });
    this.authenticatedRoute('pintxos', function() {
      this.route('new');
      this.route('edit', { path: '/:pintxo_id/edit' });
    });
  */
});

export default Router;