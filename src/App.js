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
            tasks : [] //id, name, status
            ,isDisplayForm: false
        };
    }

    componentWillMount(){
      if (localStorage && localStorage.getItem('tasks')) {
         var tasks = JSON.parse(localStorage.getItem('tasks'));
         this.setState({
            tasks : tasks
         });
      }
    }

    onGenerateData = () => {
      var tasks = [
            {
              id: randomstring.generate(),
              name: 'di lam',
              status: false
            },
            {
              id: randomstring.generate(),
              name: 'doc sach',
              status: false
            },
            {
              id: randomstring.generate(),
              name: 'an com',
              status: true
            }
      ];
      console.log(tasks)

      this.setState({
        tasks: tasks
      });

      //save data to localStorage
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    onToggleForm = () => {
      this.setState({
          isDisplayForm: true
      });
    }

    onCloseForm = () => {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm
      });
    }

  render(){
    var {tasks, isDisplayForm} = this.state;
    var elmTaskForm = isDisplayForm ? <TaskForm onCloseForm = {this.onCloseForm}/> : '';
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

                <button type="button" 
                        className="btn btn-danger ml-5"
                        onClick={ this.onGenerateData }>
                    Generate id data
                </button>

                {/*Search-Sort*/} 
                <Control/>

                <div className="row mt-15">
                    <TaskList tasks = { tasks }/>
                </div>
            </div>
          </div>
      </div>
    );
  }
}
export default App;
