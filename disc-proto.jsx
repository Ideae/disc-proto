Entries = new Mongo.Collection("entries");
Relations = new Mongo.Collection("relations");

if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
  Meteor.subscribe("entries");
  Meteor.subscribe("relations");
  
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
	Meteor.publish("entries", function() {
		return Entries.find();
	});
	Meteor.publish("relations", function() {
		return Relations.find();
	});
}

Meteor.methods({
	addEntry(text, tag) {
		//console.log(text + " : 1");
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		//console.log(text + " : 2");
		return Entries.insert({
			text: text,
			tag: tag,
			childEntryIds: [],
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	
	addEntryToParent(parentId, text, tag) {
		let parent = Entries.findOne(parentId);
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		let childId = addEntry(text, tag);
		parent.childEntryIds.push(childId);
		return childId;
	},
	
	removeEntry(entryId) {
		const entry = Entries.findOne(entryId);
		if (entry.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		Entries.remove(entryId);
	}
});