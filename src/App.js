import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
var randomstring = require("randomstring");
//install random string value 

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : null //id, name, status
            ,isDisplayForm: false
            ,taskEditing : null
        };
    }

    UNSAFE_componentWillMount(){
      if (localStorage && localStorage.getItem('tasks')) {
         var tasks = JSON.parse(localStorage.getItem('tasks'));
         this.setState({
            tasks : tasks
         });
      }
    }

    onToggleForm = () => {
      this.setState({
          isDisplayForm: true
      });
    }

    onCloseForm = () => {
      this.setState({
        isDisplayForm: false
      });
    }

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

  render(){
    var {tasks, isDisplayForm, taskEditing} = this.state;
    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit}
                                                onCloseForm = {this.onCloseForm}
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
                <Control/>

                <div className="row mt-15">
                    <TaskList tasks = { tasks }
                              onDelete={this.onDelete}
                              onUpdateStatus={this.onUpdateStatus}
                              onUpdate = {this.onUpdate}/>
                </div>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
