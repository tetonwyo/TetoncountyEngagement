import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.modelFor('application');
  },
  renderTemplate() {
    this._super();
    this.render('index-sidebar', {
      into: 'application',
      outlet: 'sidebar'
    });
  }
});
