App = React.createClass({
	
	mixins: [ReactMeteorData],
	
	getInitialState() {
		return {
			//...
		}
	},
	
	getMeteorData() {
		return {
			entries: Entries.find({}, { sort: { createdAt: -1}}).fetch(),
			relations: Relations.find().fetch(),
			currentUser: Meteor.user()
		}
	},
	
	renderEntries() {
		console.log(this);
		return this.data.entries.map((entry) => {
			return <Entry
				key={entry._id}
				entry={entry} />;
		});
	},
	
	render() {
		return (
			<div className="container">
				<header>
				<h1>Discussion</h1>
				
				<AccountsUIWrapper />
				
				<EntryForm />
				
				</header>
		
				<ul>
					{this.renderEntries()}
				</ul>
			</div>
		);
	}
	
});