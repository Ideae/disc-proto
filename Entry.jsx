Entry = React.createClass({
	propTypes: {
		entry: React.PropTypes.object.isRequired
	},
	
	deleteThisEntry() {
		Meteor.call("removeEntry", this.props.entry._id);
	},
	
	render() {
		return (
				<li className="entry">
					<span className="entry-author">{this.props.entry.username}</span>
					<span className="entry-tag">{this.props.entry.tag}</span>
					<br/>
					{this.props.entry.text}
				</li>
		);
	}
});