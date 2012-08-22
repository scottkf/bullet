var path = require('path')
  , fs = require('fs')
  , utile = require('utile');

module.exports = function (app, pwd) {

  var locals = { r: app.r, errs: {} };

  var dir = path.join(pwd, 'app/helpers');
  var files = fs.readdirSync(dir);

  files.forEach(function (file) {
    if (path.extname(file) == '.js') {
      var helperObj = require(path.join(dir, file));
      Object.keys(helperObj).forEach(function (key) {
        locals[key] = helperObj[key];
      });
    }
  });

  locals.form = function (model, mName, errs) {
    errs = app.modErr(errs);

    var id = function (key) {
      return '"' + mName + '_' + key + '"';
    };

    var name = function (key) {
      return '"' + mName + '[' + key + ']"';
    };

    var layout = function (key, inp) {
      var ret = '';
      ret+= '<div class="control-group' + (errs[key]?' error':'') + '">';
      ret+= '<label class="control-label" for=' + id(key) + '>';
      ret+= utile.inflect.titleize(key) + '</label><div class="controls">';
      ret+= inp + (errs[key]?'<span class="help-inline">' + errs[key] + '</span>':'');
      ret+= '</div></div>';
      return ret;
    };

    return {
      text: function (key) {
        return layout(key, '<input type="text" class="input-xlarge" id=' + id(key) + ' name=' + name(key) + ' value="' + (model[key]?model[key]:'') + '"/>');
      },
      textarea: function (key) {
        return layout(key, '<textarea class="input-xxlarge" rows="10" id=' + id(key) + ' name=' + name(key) + '>' + (model[key]?model[key]:'') + '</textarea>');
      },
      select: function (key, vals, names) {
        var opt = '';
        names = names || vals;
        for(i=0;i<vals.length;i++) {
          var s = ((model[key] && model[key]==vals[i])?'" selected="selected"':'"');
          opt+= '<option value="' + vals[i] + s + '>' + names[i] + '</option>';
        };
        return layout(key, '<select class="input-xlarge" id=' + id(key) + 'name=' + name(key) + '>' + opt + '</select>');
      },
      checkbox: function (key, vals, names, inline) {
        var opt = '';
        inline = (inline?' inline':'');
        names = names || vals;
        for(i=0;i<vals.length;i++) {
          var c = ((model[key] && model[key]==vals[i])?'" checked="checked"':'"');
          opt+= '<label class="checkbox' + inline + '"><input type="checkbox" name=' + name(key) + ' value="' + vals[i] + c + '/>' + names[i] + '</label>';
        }
        return layout(key, opt);
      },
      radio: function (key, vals, names, inline) {
        var opt = '';
        inline = (inline?' inline':'');
        names = names || vals;
        for(i=0;i<vals.length;i++) {
          var c = ((model[key] && model[key]==vals[i])?'" checked="checked"':'"');
          opt+= '<label class="radio' + inline + '"><input type="radio" name=' + name(key) + ' value="' + vals[i] + c + '/>' + names[i] + '</label>';
        }
        return layout(key, opt);
      },
    };
  };

  app.helpers = function (req, res, next) {
    res.locals = locals;
    req.flash = app.flash;
    res.locals.flash = req.flash();
    next();
  };
};
