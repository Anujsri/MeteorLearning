import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js'; 
import { Accounts } from 'meteor/accounts-base';

//Accounts config

Accounts.ui.config({
  	passwordSignupFields: 'USERNAME_ONLY',
});

import './main.html';

Template.body.helpers({
   // 	notes : [
   // 		{text : 'My Note 1'},
   // 		{text : 'My Note 2'},
   // 		{text : 'My Note 3'},
   // ]
   notes(){
   		return Notes.find({});
   }
});

Template.add.events({
	'click .add-form' :function(){
		console.log("ANuj");
		event.preventDefault();

		//Get input Value

		const target = event.target;
		const text = document.getElementById('name').value;
		console.log("ANuj : "+ text);
		 const authorname = document.getElementById('authorname').value;
		console.log("Name : " + authorname)

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

 

 

 