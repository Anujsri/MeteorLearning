BlazeLayout.setRoot('body');
import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js'; 
import { NotesIndex } from '../lib/collections.js'; 
import { Accounts } from 'meteor/accounts-base';
import {Router}      from '../lib/routes.js';
import { Session } from 'meteor/session'

//Accounts config

Accounts.ui.config({
  	passwordSignupFields: 'USERNAME_ONLY',
});

import './layouts/HomeLayout.html'
import './layouts/BasicLayout.html'
// import './main.html';

Meteor.subscribe("notes");

Template.allnotesa.helpers({
    notes(){
   		return Notes.find({});
    }
});

Template.AllNotes.helpers({
	notesa : ()=>{
   		return Notes.find({});
   }
});

Template.add.events({
	'click .add-form' :function(){
		event.preventDefault();

		//Get input Value

		const target = event.target;

		const text = document.getElementById('name').value;
		 const authorname = document.getElementById('authorname').value;

		//Insert note into collection
		// var authorname = "Anuj";

		Meteor.call('notes.insert',text,authorname);
	 
		//Clear the form data
    	document.getElementById('name').value = '';
    	document.getElementById('name').value='';

    	//close the model
    	$('#addnote').modal('close');

    	return false;
	}
});

Template.note.events({
	'click .delete-note' : function(){
		Meteor.call('notes.remove',this);
		return false;
	}
})

Template.HomeLayout.events({
    'submit .search_note' : function(){
        event.preventDefault();
        const target = event.target;
        var text = target.text.value;
        console.log("Text : " + text);
        // On Client
        var result  = [];
        var res = document.getElementById('searchednote');
        Tracker.autorun(function () {
          let cursor = NotesIndex.search(text) ;
          var len =  cursor.count();
          if(len===0){
              console.log("Not Found");
              Session.set('notnotes', 'No data found with keyword "' + text +'"');
          }
          else{
              result = cursor.fetch();
          } 
        })
        res.innerHTML = 'Searched Keyword "' + text + '"';
        target.text.value="";
        Session.set('notes', result);
        return false;
    }
});

Template.Serachbox.helpers({
    result : ()=>{
        return Session.get('notes');
    }
})

Template.Serachbox.helpers({
     notresult : ()=>{
        return Session.get('notnotes');
    }
})
