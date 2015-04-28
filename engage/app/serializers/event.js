import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalize(type, event) {
    return {
      id: event.eventID,
      allDay: event.allDay,
      title: event.title,
      start: event.start,
      end: event.end
      // event.organization, "fair"
      // event.type, "general",
      // event.source "tetonwyo"
    };
  }
});
