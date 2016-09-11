import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Task } from 'src/core/tasks';
import CMMAc from '../autosuggest/index';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit'
import MUIAutoComplete from 'material-ui/AutoComplete';
import cmmdata from '../autosuggest/cmmdata.js';
import SvgIcon from 'material-ui/SvgIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
const muiTheme = getMuiTheme(darkBaseTheme);
class TaskItem extends Component {
  static propTypes = {
    deleteTask: PropTypes.func.isRequired,
    task: PropTypes.instanceOf(Task).isRequired,
    updateTask: PropTypes.func.isRequired,
    editing: PropTypes.bool,
    loadTaskForEditing: PropTypes.func,
    taskToEdit: PropTypes.instanceOf(Task)
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      editing: false,
      time: 0,
      employee: '',
      service: '',
      job: '',
      note: ''
    };

    this.delete = ::this.delete;
    this.editTask = ::this.editTask;
    this.saveTask = ::this.saveTask;
    this.stopEditing = ::this.stopEditing;
    this.toggleStatus = ::this.toggleStatus;
    this.onKeyUp = ::this.onKeyUp;
    // this.onChange = ::this.onChange;
  }
    static escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.task !== this.props.task || nextState.editing !== this.state.editing;
}

  delete() {
    this.props.deleteTask(this.props.task);
  }

  editTask() {
    const task = this.props.task;

    this.setState({
      time: task.time,
      employee: task.employee.trim(),
      service: task.service.trim(),
      job: task.job.trim(),
      note: task.note.trim(),
      editing: true
    });

  }

  saveTask(event) {
          const { task } = this.props;
          const taskstate=this.state;
              this.props.updateTask(task, {service: taskstate.service });
              // this.setState({service: event.target.value});
              this.props.updateTask(task, {employee: taskstate.employee });
              // this.setState({employee: event.target.value});
              this.props.updateTask(task, {note: taskstate.note });
              // this.setState({note: event.target.value});
              this.props.updateTask(task, {job: taskstate.job });
              // this.setState({job: event.target.value});
              this.props.updateTask(task, {time: taskstate.time });
              // this.setState({time: event.target.value});
    this.stopEditing();

  }
    handleChange(name, newvalue){
      switch(name) {
        case "Service":
          this.setState({service: newvalue});
          break;
        case "Employee":
          this.setState({employee: newvalue});
          break;
        case "Job":
          this.setState({job: newvalue});
          break;
      }
    }
  // onTimeChange = (event) => {
  //   console.log(event.target.name+event.target.value);
  //   this.state.time=event.target.value;};
  // onNoteChange = (event) => {
  //   console.log(event.target.name+event.target.value);
  //   this.setState({note: event.target.value});
  // };
    handleOnChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      switch(name) {
        case "Note":
          this.setState({note: value});
          break;
        case "Time":
          this.setState({time: value});
          break;
      default:
        break;
    }
      console.log("default change - "+event.target.name+" vale: "+event.target.value);

  }
  stopEditing() {
    this.setState({editing: false});

  }

  toggleStatus() {
    let checked = !this.props.task.completed;
    this.props.updateTask(this.props.task, {completed: checked});
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      //enter
      this.saveTask(event);
    }
    else if (event.keyCode === 27) {
//esc
      this.stopEditing();
    }
  }
  getNames(data) {
      var kvArray = [{key:1, value:10}, {key:2, value:20}, {key:3, value: 30}];
      var reformattedArray = data.map(function(obj){
          var rObj = [];
          rObj.push = obj.name;
          return rObj;
      });
  }
  renderTaskCard(task) {
    const style = {
      marginRight: 20,
    };
      const iconStyles = {
          marginRight: 24,
      };

      const EditSVGIcon = (props) => (
          <SvgIcon {...props}>
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />

              {/*<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />*/}
          </SvgIcon>
      );

      const EditSVG = () => (
          <div>
              <EditSVGIcon style={iconStyles} color={red500} hoverColor={greenA200} viewBox="0 0 24 24"/>
          </div>
      );

      var employeenames = cmmdata.employees.map(function(a) {return a.name;});
    const { editing } = this.state;
    // const { task } = this.props;
      const dataSourceConfig = {
          text: 'name',
          value: 'name',
      };
    return (
    <div className="bigDiv"><MuiThemeProvider muiTheme={muiTheme}>

    <Card >
      <CardHeader
          title={"Hours: " + task.time +" @ "+ "Job: "+ task.job.trim()}
          subtitle={"Service: "+task.service.trim()}
          actAsExpander={true}
          showExpandableButton={true}
      />
     <CardActions>
       <div>
           <span>
              <FloatingActionButton style={style}>
                <CheckCircleIcon />
              </FloatingActionButton>
              <FloatingActionButton style={style} aria-hidden={editing}
                              aria-label="Delete task"
                              onClick={this.delete}
                               ref={c => this.deleteButton = c}>
                    <DeleteIcon />
              </FloatingActionButton>
              <FloatingActionButton style={style} aria-hidden={editing}
                                    aria-label="Mark task as completed"
                                    onClick={this.toggleStatus}
                                    ref={c => this.toggleStatusButton = c} children={<EditSVGIcon color={red500} hoverColor={greenA200} viewBox="0 0 24 24"/>}>
              </FloatingActionButton>
          </span>
       </div>
     </CardActions>
      <CardText expandable={true}>
          {task.note}<br/>
          <MUIAutoComplete
              floatingLabelText="Type 'peah', fuzzy search"
              filter={MUIAutoComplete.fuzzyFilter}
              dataSource={cmmdata.employees}
              dataSourceConfig={dataSourceConfig}
              maxSearchResults={25}
          />
      </CardText>
    </Card>
   </MuiThemeProvider>
    </div>
    );
          }
  renderTask(task) {
    return (<div className="task-form">
          <CMMAc id="Employee" name="Employee" handleChange={::this.handleChange} handleKeyUp={::this.onKeyUp} value={this.state.employee} ref={ (ref) => this.employeeinput = ref } onSubmit={this.saveTask}/>
          <CMMAc id="Service" name="Service" handleChange={::this.handleChange} handleKeyUp={::this.onKeyUp} value={this.state.service} ref={ (ref) => this.serviceinput = ref }onSubmit={this.saveTask}/>
          <CMMAc id="Job" name="Job" handleChange={::this.handleChange} handleKeyUp={::this.onKeyUp} value={this.state.job} ref={ (ref) => this.jobinput = ref } onSubmit={this.saveTask}/>
          <input
              id="Note"
              autoComplete="off"
              className="Note"
              maxLength="256"
              onChange={this.handleOnChange}
              onKeyUp={this.onKeyUp}
              placeholder="Note"
              type="text"
              name="Note"
              value={this.state.note}
              onSubmit={this.saveTask}
              />
          <label className="Time" >Hours</label>
          <input
              id="Time"
              name="Time"
              autoComplete="off"
              className="Time"
              maxLength="1"
              onChange={this.handleOnChange}
              onKeyUp={this.onKeyUp}
              placeholder="Time"
              type="number"
              value={this.state.time}
              ref={c => this.timeInput = c}
              onSubmit={this.saveTask}
              /></div>


    );
  }

  render() {
    const { editing } = this.state;
    const { task } = this.props;

    return (
      // <div className={classNames('task-item', {'task-item--completed': task.completed, 'task-item--editing': editing})} tabIndex="0">
      //   <div className="cell">
      //     <button
      //       aria-hidden={editing}
      //       aria-label="Mark task as completed"
      //       className={classNames('btn task-item__button', {'hide': editing})}
      //       onClick={this.toggleStatus}
      //       ref={c => this.toggleStatusButton = c}
      //       type="button">
      //       <svg className={classNames('icon', {'icon--active': task.completed})} width="24" height="24" viewBox="0 0 24 24">
      //         <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
      //       </svg>
      //     </button>
      //   </div>

        <div className="cell">
          {editing ? this.renderTask(task) : this.renderTaskCard(task)}
        </div>
      //
      //   <div className="cell">
      //     <button
      //       aria-hidden={!editing}
      //       aria-label="Cancel editing"
      //       className={classNames('btn task-item__button', {'hide': !editing})}
      //       onClick={this.stopEditing}
      //       ref={c => this.cancelEditButton = c}
      //       type="button">
      //       <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
      //         <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      //         <path d="M0 0h24v24H0z" fill="none"></path>
      //       </svg>
      //     </button>
      //     <button
      //       aria-hidden={editing}
      //       aria-label="Edit task"
      //       className={classNames('btn task-item__button', {'hide': editing})}
      //       onClick={this.editTask}
      //       ref={c => this.editButton = c}
      //       type="button">
      //       <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
      //         <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      //       </svg>
      //     </button>
      //     <button
      //       aria-hidden={editing}
      //       aria-label="Delete task"
      //       className={classNames('btn task-item__button', {'hide': editing})}
      //       onClick={this.delete}
      //       ref={c => this.deleteButton = c}
      //       type="button">
      //       <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
      //         <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      //       </svg>
      //     </button>
      //   </div>
      // </div>
    );
  }
}

export default TaskItem;
