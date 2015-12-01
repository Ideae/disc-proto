Entry = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		return {
			childEntries: Entries.find({_id: {$in: this.props.entry.childEntryIds}}).fetch()
		};
	},
	
	getInitialState() {
		return {
			showForm: false
		};
	},
	
	propTypes: {
		entry: React.PropTypes.object.isRequired
	},
	
	deleteThisEntry() {
		Meteor.call("removeEntry", this.props.entry._id);
	},
	
	toggleEntryForm() {
		//console.log("yep");
		this.setState({showForm: ! this.state.showForm});
	},
	closeEntryForm() {
		this.setState({showForm: false});
	},
	
	renderEntries() {
		console.log("LEN:" + this.data.childEntries.length);
		var childs = this.data.childEntries.map((entry) => {
			return <Entry
				key={entry._id}
				entry={entry} />;
			});
		return ( 
			<div>
			<br/>
			{ childs }
			</div>
		);
	},
	
	render() {
		return (
				<li className="entry">
					<span className="entry-author">{this.props.entry.username}</span>
					<span className="entry-tag">{this.props.entry.tag}</span>
					<br/>
					{this.props.entry.text}<br/>
					<a href="javascript:void(0)" onClick={this.toggleEntryForm}>Reply</a>
					{ this.state.showForm ? 
						<div>
						<EntryForm parentEntryId={this.props.entry._id} closeForm={this.closeEntryForm} />
						</div> : ''
					}
					{ this.data.childEntries.length > 0 ?
						<ul>
						{this.renderEntries()}
						</ul> : ''
					}
					
				</li>
		);
	}
});