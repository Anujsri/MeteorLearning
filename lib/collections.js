import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
import { check } from 'meteor/check';
export const Notes = new Mongo.Collection('notes');


Meteor.methods({
	'notes.insert'(text){
		check(text,String);
		console.log("add2 "+ text);
		// Check if user is loggedin
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
		Notes.insert({
			text,
			createdAt : new Date(),
			owner : Meteor.userId(),
			username : Meteor.user().username,
		});
		console.log("add3 "+ text);
	},
	'notes.remove'(note){
		check(note._id,String);
		if(note.owner !== Meteor.userId()){
			alert("You can not delete this note");
		}
		Notes.remove(note._id);
	}
});