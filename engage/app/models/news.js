import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  date: DS.attr('date'),
  media: DS.belongsTo('media'),
  title: DS.attr('string')
});
