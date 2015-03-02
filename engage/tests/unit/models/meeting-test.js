import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('meeting', {
  // Specify the other units that are required for this test.
  needs: ['model:media', 'model:link']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
