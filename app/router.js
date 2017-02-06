import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootURL: config.rootURL
});

Router.map(function() {
  this.route('sign-up');
  this.route('sign-in');
  this.authenticatedRoute('welcome');
  this.authenticatedRoute('editions');
  this.authenticatedRoute('teams');
  this.authenticatedRoute('pintxos');
});

export default Router;
