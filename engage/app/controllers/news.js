import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['articleId'],
  articleId: undefined, // queryParams can't be computed.
  activeArticle: Ember.computed('articleId', function (key, value) {
    var articleId = this.get('articleId');

    if (value) {
      this.set('articleId', value.get('id'));
      return value;
    }

    if (articleId) {
      return this.get('model').findBy('id', articleId);
    }
    this.set('articleId', undefined);
  }),
  actions: {
    openModal (article) {
      this.set('activeArticle', article);
    }
  }
});
