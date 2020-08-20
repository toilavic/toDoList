import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name: null,
            status: false
        };
    }

    UNSAFE_componentWillMount() {
      if(this.props.task) {
        this.setState({
            id : this.props.task.id
            ,name: this.props.task.name
            ,status: this.props.task.status
        });
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if(nextProps && nextProps.task) {
        this.setState({
            id : nextProps.task.id
            ,name: nextProps.task.name
            ,status: nextProps.task.status
        });
      }
      else if (!nextProps.task) {
        this.setState({
            id : ''
            ,name: ''
            ,status: false
        });
      }
    }

    onCloseForm = () => {
        // this.props.onCloseForm();
        // this.setState({
        //     id : ''
        // });
        
         this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = event.target.name;
        var value = target.value;
        if(name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        //close form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id : ''
            ,name: ''
            ,status: false
        });
    }

  render(){
    return (
      <div className="panel panel-warning">
                    <div className="panel-heading">
                      <h3 className="panel-title"> {this.state.id ? "Edit task" : "Add a new task"}
                        <span className="fa fa-times-circle text-right fl"
                                onClick={this.onCloseForm}
                         ></span>
                      </h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label>Name :</label>
                                <input type="text" className="form-control"
                                        name= "name"
                                        value= {this.state.name || ""}
                                        onChange={this.onChange} />
                            </div>
                            <label>Status :</label>
                            <select className="form-control"
                                    name= "status"
                                    value= {this.state.status}
                                    onChange={this.onChange}
                                    required="required">
                                <option value={true}>Active</option>
                                <option value={false}>De-active</option>
                            </select>
                            <br/>
                            <div className="text-center" >
                                <button type="submit" className="btn btn-warning" onClick={this.onSubmit}>Add</button>&nbsp;
                                <button type="submit" 
                                        className="btn btn-danger"
                                        onClick={this.onClear} onClick={this.onCloseForm}>Cancel
                                </button>
                            </div>
                        </form>
                      
                    </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask : (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
      }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
