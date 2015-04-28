import DS from 'ember-data';
import Ember from 'ember';

let $ = Ember.$;

const ResourceMap = {
  'news': 'news',
  'event': 'calevents'
};

export default DS.Adapter.extend({
  host: 'http://www.tetonwyo.org/data',
  findAll (store, type) {
    let url = this.urlFor(type.typeKey);
    return $.getJSON(url);
  },
  urlFor (typeKey) {
    return `${this.get('host')}/${ResourceMap[typeKey]}.ashx`;
  }
});
