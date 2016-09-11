import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/core/notification';
import { getTaskFilter, getVisibleTasks, tasksActions } from 'src/core/tasks';
import Notification from '../../components/notification';
import TaskFilters from '../../components/task-filters';
import TaskForm from '../../components/task-form';
import TaskList from '../../components/task-list';
import { Task } from 'src/core/tasks';

export class Tasks extends Component {
    static propTypes = {
    createTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    filterTasks: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
     loadTasks: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    tasks: PropTypes.instanceOf(List).isRequired,
    undeleteTask: PropTypes.func.isRequired,
    unloadTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    loadTaskForEditing:PropTypes.func,
    taskToEdit:PropTypes.instanceOf(Task)
    };
    constructor(props, context) {
        super(props, context);

        this.state = {
            editing: false,
            editingTask: null
        };
    }
  componentWillMount() {
    this.props.loadTasks();
    this.props.filterTasks(this.props.location.query.filter);
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
        action={this.props.undeleteTask}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }
  editThisTask(atask){
        this.setState({editingTask: atask});
      return atask;
  }
    isEditing(editing){
        this.setState({editing:editing});
        return editing;

    }
    render() {
    return (
      <div className="g-row">
        <div className="g-col">
          <TaskForm
              createTask={this.props.createTask}
              updateTask={this.props.updateTask}
              tasks={this.props.tasks}
              editing={this.state.editing}
              loadTaskForEditing={this.props.loadTaskForEditing}
              taskToEdit={this.props.taskToEdit}
          />
        </div>

        <div className="g-col">
          <TaskFilters filter={this.props.filterType} />
          <TaskList
            deleteTask={this.props.deleteTask}
            tasks={this.props.tasks}
            updateTask={this.props.updateTask}
            loadTaskForEditing={this.props.loadTaskForEditing}
            taskToEdit={this.props.taskToEdit}
          />
        </div>

        {this.props.notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getTaskFilter,
  getVisibleTasks,
  (notification, filterType, tasks) => ({
    notification,
    filterType,
    tasks
  })
);

const mapDispatchToProps = Object.assign(
  {},
  tasksActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
