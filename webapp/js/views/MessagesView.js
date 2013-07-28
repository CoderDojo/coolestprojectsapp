app.views.MessagesView = Backbone.View.extend({
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});
