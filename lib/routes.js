FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout',{main : 'allnotesa'});
    }
});

FlowRouter.route('/anuj', {
    name: 'allnotes',
    action() {
        BlazeLayout.render('BasicLayout',{main : 'AllNotes'});
    }
});

FlowRouter.route('/search', {
    name: 'allnotes',
    action() {
        BlazeLayout.render('HomeLayout',{main : 'Serachbox'});
    }
});

 

 