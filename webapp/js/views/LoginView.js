app.views.LoginView = Backbone.View.extend({
    login: function() {
    	alert("handling your data");
    	return false;
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    events: {
    	"submit": "login"
    }
});
