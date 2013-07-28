app.views.RegisterView = Backbone.View.extend({
    createUser:function() {
    	//handle form data
    	return false;
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    events: {
    	"submit": "createUser"
    }
});
