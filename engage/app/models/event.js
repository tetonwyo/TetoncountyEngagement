import DS from 'ember-data';

export default DS.Model.extend({
  allDay: DS.attr('boolean'),
  description: DS.attr('string'),
  end: DS.attr('date'),
  start: DS.attr('date'),
  title: DS.attr('string'),
  media: DS.attr(),
  date: DS.attr()
});
