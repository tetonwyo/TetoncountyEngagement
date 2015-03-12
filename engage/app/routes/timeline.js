import Route from 'engage/routes/section-briefs-route';

export default Route.extend({
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
