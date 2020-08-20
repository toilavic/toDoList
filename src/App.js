import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
import _ from 'lodash';
import demo from './training/demo';
import { connect } from 'react-redux';
import * as actions from './actions/index'
var randomstring = require("randomstring");
//install random string value 

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // tasks : [] //id, name, status
            taskEditing : null,
            filter: {
              name : ''
             ,status : -1 
            }
            ,keyword : ''
            ,sort : {
              name : ''
              ,value : ''
            }
        };
    }

    // UNSAFE_componentWillMount(){
    //   if (localStorage && localStorage.getItem('tasks')) {
    //      var tasks = JSON.parse(localStorage.getItem('tasks'));
    //      this.setState({
    //         tasks : tasks
    //      });
    //   }
    // }

    onToggleForm = () => {
      // if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      //   this.setState({
      //       isDisplayForm: true,
      //       taskEditing : null
      //   });
      // } else {
      //   this.setState({
      //       isDisplayForm: !this.state.isDisplayForm
      //       ,taskEditing : null
      //   });
      // }
      this.props.onToggleForm();
    }

    // onCloseForm = () => {
    //   this.setState({
    //     isDisplayForm: false,
    //     taskEditing: null
    //   });
    // }

    onSubmit = (addTask) => {
      var {tasks} = this.state;
      if (addTask.id === "") {
          addTask.id = randomstring.generate();
          tasks.push(addTask);
      } else {
        var index = this.findIndex(addTask.id);
        tasks[index] = addTask;
      }
      this.setState({
        tasks: tasks
        ,taskEditing : null
      });
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }

    onUpdateStatus = (id) => {
      var {tasks} = this.state;
      var index = this.findIndex(id);
      console.log(index);
      if (index !== -1) {
        tasks[index].status = !tasks[index].status;
        this.setState({
          tasks : tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }

    findIndex = (id) => {
      var {tasks} = this.state;
      var resultIndex = -1;
      tasks.forEach((task, index) => {
        if (task.id === id) {
          resultIndex = index;
        }
      });
      return resultIndex; 
    }

    onDelete = (id) => {
      var {tasks} = this.state;
      var index = this.findIndex(id);
      if (index!== -1) {
        tasks.splice(index,1);
        this.setState({
          tasks : tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
      }
      this.onCloseForm();
    } 

    onUpdate = (id) => {
      var {tasks} = this.state;
      var index = this.findIndex(id);
      var taskEditing = tasks[index];
      
      this.setState({
          taskEditing : taskEditing
      });
      this.onShowForm();
    }

    onShowForm = () => {
      this.setState({
        isDisplayForm: true
      });
    }

    onFilter = (filterName, filterStatus) => {
      filterStatus = +filterStatus; //string to number
      this.setState({
        filter : {
          name : filterName.toLowerCase()
          ,status : filterStatus
        }
      });
    }

    onSearch = (keyword) => {
      this.setState({
        keyword : keyword
      });
    }

    onSort = async (name, val) => {
        await this.setState({
            sort: {
                name: name,
                value: val
            }
        });
        console.log(this.state.sort)
    }

  render(){

    var { taskEditing, filter, keyword, sort} = this.state; 

    var { isDisplayForm } = this.props;

    // 'same AJAX' find task
    if (filter)
    {
      // if (filter.name) {
      //   tasks = tasks.filter((task) => {
      //     return task.name.toLowerCase().indexOf(filter.name) !== -1;
      //   });
      // }
      
      // tasks = tasks.filter((task) => {
      //     if (filter.status === -1) {
      //       return task;
      //     } 
      //     else
      //     {
      //       return task.status === (filter.status === 1 ? true : false); 
      //     }
      //   });
      } 
      // search
      // if(keyword) {
      //   tasks = tasks.filter((task) => {
      //     return task.name.toLowerCase().indexOf(keyword) !== -1;
      //   });
      // }
      // // sort
      // if(sort.name === 'name') {
      //   tasks.sort((a,b) => {
      //     if (a.name > b.name) return sort.value;
      //     else if (a.name < b.name) return -sort.value;
      //     else return 0;
      //   });
      // } else {
      //   tasks.sort((a,b) => {
      //     if (a.status > b.status) return -sort.value;
      //     else if (a.status < b.status) return sort.value;
      //     else return 0;
      //   });
      // }
    
    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit}
                                                task = {taskEditing}/> : '';
    return (
      <div className="container-fluid">
          <div className="text-center">
              <h1>To do list</h1> <hr/>
          </div>
          <div className="row">
              <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-3" : ""}>
                {/*form*/} 
                  {elmTaskForm}
              </div>
              <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                <button type="button" 
                        className="btn btn-primary"
                        onClick={this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Add a new task
                </button>

                {/*Search-Sort*/} 
                <Control onSearch = {this.onSearch}
                         onSort = {this.onSort}/>

                <div className="row mt-15">
                    <TaskList 
                              onDelete={this.onDelete}
                              onUpdateStatus={this.onUpdateStatus}
                              onUpdate = {this.onUpdate}
                              onFilter = {this.onFilter}/>
                </div>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      isDisplayForm : state.isDisplayForm
    };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
      onToggleForm : () => {
        dispatch(actions.toggleForm());
      }
  };
}; 
export default connect(mapStateToProps, mapDispatchToProps)(App);
