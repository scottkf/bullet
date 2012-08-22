Command =
  # Short names to invoke commands.
  aliases:
    c: 'console'
    # g: 'generate'
    # s: 'server'

  # Figure out the command you want to run, then run it.
  #
  # @param [Array] argv Command line arguments (['node', 'tower', 'new', 'blog'])
  #
  # @return [void]
  run: (argv) ->
    command = argv[2]
    command = 'console' if !command || !!command.match(/^-/)
    command = @aliases[command] if @aliases.hasOwnProperty(command)
    #throw new Error('You must give tower a command (e.g. 'tower new my-app' or 'tower server')') unless command
    try
      command = require("./#{command}")
      command = new command(argv)
      command.run()
    catch e
      console.log e
    # command = new Tower['Command' + Tower.SupportString.camelize(command)](argv)

module.exports = Command
