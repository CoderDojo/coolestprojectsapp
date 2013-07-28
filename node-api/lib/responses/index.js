var responses = {
	success: function(responseObj) {
		return { success: responseObj }
	},
	error: function(err_message, extend) {
		var err = {
			error: {
				message: err_message
			}
		}
		var extend = extend || {};
		for(var item in extend) {
			err.error[item] = extend[item]
		}
		return err
	}
}

module.exports = responses