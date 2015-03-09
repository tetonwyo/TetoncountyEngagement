import Ember from 'ember';


export default Ember.Route.extend({
  model () {
    var models = [
      'event',
      'meeting',
      'mention',
      'news'
    ];
    var promises = models.map(model => this.store.find(model));

    return Ember.RSVP.all(promises).then(models =>
      [].concat.apply([], models.map(model => model.get('content')))
    ).then(model => model.sortBy(['date']));
  }
});
