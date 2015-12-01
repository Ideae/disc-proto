EntryForm = React.CreateClass({
	propTypes: {
		parentEntryId: React.PropTypes.bool
	},
	
	handleSubmit(event) {
		//console.log("addEntry");
    event.preventDefault();
		
    //console.log(this);
    // Find the text field via the React ref
    var entryText = React.findDOMNode(this.refs.entryInput).value.trim();
		var tagText = React.findDOMNode(this.refs.tagInput).value.trim();
 		
		if (this.props.parentEntryId) {
			Meteor.call("addEntryToParent", this.props.parentEntryId, entryText, tagText);
		} else {
    	Meteor.call("addEntry", entryText, tagText);
		}
    // Clear form
    React.findDOMNode(this.refs.entryInput).value = "";
		//React.findDOMNode(this.refs.tagInput).value = "";
  },
	
	render() {
		return (
			{ this.data.currentUser ?
					<form className="new-entry" onSubmit={this.handleSubmit} >
						Add Entry <br/>
						{/*<input
							type="text"
							ref="entryInput"
							placeholder="Type to add new entries" /> <br/>*/}
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
					</form> : ''
				}
		);
	}
});