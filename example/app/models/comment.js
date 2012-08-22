module.exports = function () {

  this.parent('Post');

  this.string('name', {
    required: true,
    minLength: 5
  });

  this.string('content');

  this.timestamps();

  this.filter('all', {
    map: function (doc) {
      if (doc.resource === 'Comment') {
        emit(doc._id, doc);
      }
    }
  });

  this.before('save', function (obj) {
    obj.id = obj.content.slice(0,10);
    return true;
  });
};
