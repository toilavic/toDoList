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
      addTask.id = randomstring.generate();
      tasks.push(addTask);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks))
    }

    // findIndex = (id) => {
    //   var {tasks} = this.state;
    //   tasks.forEach((task, index) => {
    //     if (task.id === id) {
    //       return index;
    //     }
    //     return -1;
    //   }); 
    // }

    // onDelete = (id) => {
    //   var {tasks} = this.state;
    //   var index = this.findIndex(id);
    //   if (index!== -1) {
    //     tasks.splice(index,1);
    //     this.setState({
    //       tasks : tasks
    //     });
    //     localStorage.setItem('tasks',JSON.stringify(tasks));
    //   }
    //   this.onCloseForm();
    // } 

  render(){
    var {tasks, isDisplayForm} = this.state;
    var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm = {this.onCloseForm}/> : '';
    return (
      <div className="container-fluid">
          <div className="text-center">
              <h1>Quản lý công việc</h1> <hr/>
          </div>
          <div className="row">
              <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                {/*form*/} 
                  {elmTaskForm}
              </div>
              <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
                <button type="button" 
                        className="btn btn-primary"
                        onClick={this.onToggleForm}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>

                {/*Search-Sort*/} 
                <Control/>

                <div className="row mt-15">
                    <TaskList tasks = { tasks }
                              onDelete={this.onDelete}/>
                </div>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
