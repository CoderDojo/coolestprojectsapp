app.views.HomeView = Backbone.View.extend({
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});
