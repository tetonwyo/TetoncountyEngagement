import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['carousel', 'slide'],
  startCarousel: function() {
    this.$().carousel({
      ride: this.get('ride')
    });
    var activeImage = this.getWithDefault('image', 1);
    this.$().find(`.item:nth-child(${activeImage})`).addClass('active');
  }.on('didInsertElement'),
  actions: {
    next() {
      this.$().carousel('next');
      this.incrementProperty('image');
    },
    prev() {
      this.$().carousel('prev');
      this.decrementProperty('image');
    }
  }
});
