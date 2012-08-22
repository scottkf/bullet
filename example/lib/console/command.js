// Generated by CoffeeScript 1.3.3
(function() {
  var Command;

  Command = {
    aliases: {
      c: 'console'
    },
    run: function(argv) {
      var command;
      command = argv[2];
      if (!command || !!command.match(/^-/)) {
        command = 'console';
      }
      if (this.aliases.hasOwnProperty(command)) {
        command = this.aliases[command];
      }
      try {
        command = require("./" + command);
        command = new command(argv);
        return command.run();
      } catch (e) {
        return console.log(e);
      }
    }
  };

  module.exports = Command;

}).call(this);
