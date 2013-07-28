app.views.ActivityMonitorView = Backbone.View.extend({
    initialize: function() {
        var self = this.render; //add self variable here
    },

    render: function() {
    	var self = this;
        this.$el.html(this.template({
            shakes: shakes
        }));

        setTimeout(function(){
            self.reRender();
        }, 400);

        return this;
    },

    reRender : function(){
    	var self = this;
    	self.render();
    }     
});
