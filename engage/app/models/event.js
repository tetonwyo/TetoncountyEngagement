import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  allDay: DS.attr('boolean'),
  description: DS.attr('string'),
  end: DS.attr('date'),
  start: DS.attr('date'),
  title: DS.attr('string'),

  date: Ember.computed.alias('start')
});
