import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// export const Notes = new Mongo.Collection('notes'); 
import { Notes } from '../lib/collections.js';
Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("notes",function(){
	return Notes.find();
});
