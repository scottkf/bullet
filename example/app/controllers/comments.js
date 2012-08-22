var app = require('../../../lib/bullet').app;

module.exports = {
  // _before: [
  //   { exec: '_get', except: ['index', 'new', 'create'] }
  // ],

  // index: function () {
  //   var self = this;
  //   app.m.Post.all(function (err, posts) {
  //     if (err) throw err;
  //     self.res.render('posts/index', { posts: posts });
  //   });
  // },

  // new: function () {
  //   this.res.render('posts/new', { post: app.m.Post.new({}) });
  // },

  create: function () {
    var self = this
      , comment = app.m.Comment.new(this.req.body.comment);

    comment.save(function (err, data) {
      if (err) {
        self.res.render('posts/new', { post: post, errs: err });
      } else {
        self.res.redirect(app.r.post_path(data.id));
      }
    });
  },

  // show: function (id) {
  //   this.res.render('posts/show', { post: this.post });
  // },

  // edit: function (id) {
  //   this.res.render('posts/edit', { post: this.post });
  // },

  // update: function (id) {
  //   var self = this;

  //   this.post.update(this.req.body.post, function (err, data) {
  //     if (err) {
  //       self.req.body.post.isNewRecord = false;
  //       self.req.flash("error", 'Error!')
  //       self.res.render('posts/edit', { post: self.req.body.post, errs: err });
  //     } else {
  //       self.req.flash("success", 'Updated!')
  //       self.res.redirect(app.r.post_path(data.id));
  //     }
  //   });
  // },

  // destroy: function (id) {
  //   var self = this;
  //   this.post.destroy(function (err, data) {
  //     if (err) {
  //       self.res.json(500);
  //     } else {
  //       self.res.json(204);
  //     }
  //   });
  // },

  // _get: function (cb, args) {
  //   var self = this;
  //   app.m.Post.get(args[0], function (err, data) {
  //     if (err) {
  //       self.res.redirect(app.r.posts_path);
  //     } else {
  //       self.post = data;
  //       app.m.Post.comments(self.post.id, function (err, comments) {
  //         self.comments = comments;
  //         cb();
  //       });
  //     }
  //   });
  // }
};

