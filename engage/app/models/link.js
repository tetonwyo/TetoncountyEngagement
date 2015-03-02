import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  title: DS.attr('string'),
  url: DS.attr('string')
});
