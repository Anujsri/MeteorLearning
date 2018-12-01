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
	'submit .add-form' :function(){
		event.preventDefault();

		//Get input Value

		const target = event.target;
		const text = target.text.value;

		//Insert note into collection

		Meteor.call('notes.insert',text);
		console.log("add1"+ text);
		//Clear the form data
    	target.text.value = '';

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

 

 

 