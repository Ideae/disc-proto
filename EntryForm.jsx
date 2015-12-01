EntryForm = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
			currentUser: Meteor.user()
		}
	},
	
	propTypes: {
		parentEntryId: React.PropTypes.string,
		closeForm: React.PropTypes.func
	},
	
	handleSubmit(event) {
    event.preventDefault();
		
    // Find the text field via the React ref
    var entryText = React.findDOMNode(this.refs.entryInput).value.trim();
		var tagText = React.findDOMNode(this.refs.tagInput).value.trim();
 		
		/*if (this.props.parentEntryId) {
			Meteor.call("addEntryToParent", this.props.parentEntryId, entryText, tagText);
		} else {
    	Meteor.call("addEntry", entryText, tagText);
		}*/
		//console.log("props:" + this.props);
		//console.log("parentId:" + this.props.parentEntryId);
		Meteor.call("addEntry", this.props.parentEntryId, entryText, tagText);
    // Clear form
    React.findDOMNode(this.refs.entryInput).value = "";
		//React.findDOMNode(this.refs.tagInput).value = "";
		this.props.closeForm();
  },
	
	render() {
		return (
					<form className="new-entry" onSubmit={this.handleSubmit} >
						Add Entry <br/>
						<textarea
							cols="40"
							rows="3" 
							ref="entryInput"
							placeholder="Enter an entry." /> <br/>
						<input
							type="text"
							ref="tagInput"
							placeholder="Type to add a tag" /> <br/>
						<input type='submit' /> <br/>
					</form>
		);
	}
});