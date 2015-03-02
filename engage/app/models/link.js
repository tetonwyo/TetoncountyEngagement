import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  date: DS.attr('date')
});
