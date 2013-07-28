app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "": "login",
        "home": "home",
        "register": "register",
        "messages": "messages",
        "activitymonitor": "activitymonitor",
        "voting": "voting"
    },

    initialize: function() {
        app.slider = new PageSlider($('body'));

    },

    login: function() {
        if (!app.loginView) {
            app.loginView = new app.views.LoginView();
            app.loginView.render();
        } else {
            console.log('reusing login view');
            app.loginView.delegateEvents();
        }
        app.slider.slidePage(app.loginView.$el);
    },

    home: function() {
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents();
        }
        app.slider.slidePage(app.homeView.$el);
    },

    register: function() {
        if (!app.registerView) {
            app.registerView = new app.views.RegisterView();
            app.registerView.render();
        } else {
            console.log('reusing login view');
            app.registerView.delegateEvents();
        }
        app.slider.slidePage(app.registerView.$el);
    },

    messages: function() {
        app.slider.slidePage(new app.views.MessagesView().render().$el);
    },

    activitymonitor: function() {
        app.slider.slidePage(new app.views.ActivityMonitorView().render().$el);
    },

    voting: function() {
        app.slider.slidePage(new app.views.VotingView().render().$el);
    }
});
