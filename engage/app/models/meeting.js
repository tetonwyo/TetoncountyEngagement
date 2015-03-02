import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  title: DS.attr('string'),
  media: DS.attr(),
  links: DS.attr()
});
