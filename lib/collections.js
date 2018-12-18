import { Mongo } from 'meteor/mongo';
import { Meteor} from 'meteor/meteor';
import { check } from 'meteor/check';
export const Notes = new Mongo.Collection('notes');
import { Index, MinimongoEngine } from 'meteor/easy:search'

Meteor.methods({
	'notes.insert'(text,authorname){
		// Check if user is loggedin
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
		Notes.insert({
			text,
			authorname : authorname,
			createdAt : new Date(),
			owner : Meteor.userId(),
			username : Meteor.user().username,
		});
	},
	'notes.remove'(note){
		check(note._id,String);
		if(note.owner !== Meteor.userId()){
			alert("You can not delete this note");
		}
		Notes.remove(note._id);
	}
});


export const NotesIndex = new Index({
  collection: Notes,
  fields: ['text', 'username'],
  engine: new MinimongoEngine(),

})