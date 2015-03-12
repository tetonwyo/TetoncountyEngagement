import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    var indexController = this.controllerFor('index', true);
    if (!indexController) {
      this.generateController('index');
    }
    this._super();
    this.render('section-briefs', {
      into: 'application',
      outlet: 'sidebar',
      controller: 'index',
      model: this.modelFor('application')
    });
  }
});
