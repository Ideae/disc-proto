App = React.createClass({
	
	mixins: [ReactMeteorData],
	
	getInitialState() {
		return {
			//...
		}
	},
	
	getMeteorData() {
		return {
			entries: Entries.find({ parentEntryId: ""}, { sort: { createdAt: -1}}).fetch(),
			relations: Relations.find().fetch(),
			currentUser: Meteor.user()
		}
	},
	
	renderEntries() {
		//console.log(this);
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
				{ this.data.currentUser ?
					<EntryForm parentEntryId=""/> : ''
				}
				
				</header>
		
				<ul>
					{this.renderEntries()}
				</ul>
				
				{/*<br/><br/>
				<ul>
					<li>L1E1</li>
					<li>L1E2
						<ul>
							<li>L2E1</li>
							<li>L2E2</li>
						</ul>
					</li>
				</ul>*/}
				
			</div>
		);
	}
	
});