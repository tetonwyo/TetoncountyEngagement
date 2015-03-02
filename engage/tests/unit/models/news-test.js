import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('news', {
  // Specify the other units that are required for this test.
  needs: ['model:media']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
