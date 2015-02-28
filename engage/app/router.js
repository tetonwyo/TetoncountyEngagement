import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('event', {path: 'events/:id'});
  this.route('organization', {path: 'organizations/:id'});
  this.route('tag');
});

export default Router;
