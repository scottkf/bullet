app = require('../../../lib/bullet').app
module.exports = 

	_before: []

	index: ->
		# @req.flash 'info', 'test'
		@res.render 'index', title: 'bullet'