import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate() {
    this._super();
    this.render('section-briefs', {
      into: 'application',
      outlet: 'sidebar'
    });
  }
});
