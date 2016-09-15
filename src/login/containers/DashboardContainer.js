import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions } from 'src/core/auth';

export class DashboardContainer extends Component {
	static propTypes = {
		// createTask: PropTypes.func.isRequired,
		// deleteTask: PropTypes.func.isRequired,
		dismissNotification: PropTypes.func.isRequired,
		filterTasks: PropTypes.func.isRequired,
		// filterType: PropTypes.string.isRequired,
		// loadTasks: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
		notification: PropTypes.object.isRequired,
		// tasks: PropTypes.instanceOf(List).isRequired,
		// undeleteTask: PropTypes.func.isRequired,
		// unloadTasks: PropTypes.func.isRequired,
		// updateTask: PropTypes.func.isRequired,
		// loadTaskForEditing:PropTypes.func,
		// taskToEdit:PropTypes.instanceOf(Task)
	};
	constructor(props, context) {
		super(props, context);

		this.state = {
			editing: false,
			editingTask: null
		};
	}
	componentWillMount() {
		// this.props.loadTasks();
		// this.props.filterTasks(this.props.location.query.filter);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.query.filter !== this.props.location.query.filter) {
			this.props.filterTasks(nextProps.location.query.filter);
			// if (nextProps.taskToEdit.key !== this.props.taskToEdit.key){
			//     this.props.loadTaskForEditing(nextProps.taskToEdit);
			// }
		}
	}

	componentWillUnmount() {
		this.props.unloadTasks();
	}

	renderNotification() {
		const { notification } = this.props;
		return (
			<Notification
				actionLabel={notification.actionLabel}
				dismiss={this.props.dismissNotification}
				display={notification.display}
				message={notification.message}
			/>
		);
	}
	// editThisTask(atask){
	// 	this.setState({editingTask: atask});
	// 	return atask;
	// }
	isEditing(editing){
		this.setState({editing:editing});
		return editing;

	}
	render () {
		return (
				<div className='col-sm-12 text-center'>
					<h1>Dashboard</h1>
					<p>This is a protected route.</p>
				</div>
			)
		}
	}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
	// getNotification,
	// getTaskFilter,
	// getVisibleTasks,
	// (notification, filterType, tasks) => ({
	// 	notification,
	// 	filterType,
	// 	tasks
	// })
);

const mapDispatchToProps = Object.assign(
	{},
	// tasksActions,
	// notificationActions
);

export default connect(null, authActions)(DashboardContainer);
