app.views.VotingView = Backbone.View.extend({
    scan: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        try {
            scanner.scan(function(args) {
                $("#info").append(args.text);
            });
        } catch (ex) {
            console.log(ex.message);
        }
    },

    render: function() {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click #scan': 'scan'
    }
});
