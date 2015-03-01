import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //this.resource('project', { path: '/project/:id'}, function () {
    this.route('about');
    this.route('calendar');
    this.route('media');
    this.route('meetings');
    this.route('mentions');
    this.route('news');
    this.route('timeline');
  //});
});

export default Router;
