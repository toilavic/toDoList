import React, {Component} from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            status: false
        };
    }

    onCloseForm = () => {
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
        this.props.onSubmit(this.state);
        //close form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

  render(){
    return (
      <div className="panel panel-warning">
                    <div className="panel-heading">
                      <h3 className="panel-title">Thêm công việc
                        <span className="fa fa-times-circle text-right fl" ></span>
                      </h3>
                    </div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" className="form-control"
                                        name= "name"
                                        value= {this.state.name}
                                        onChange={this.onChange} />
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control"
                                    name= "status"
                                    value= {this.state.status}
                                    onChange={this.onChange}
                                    required="required">
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center" >
                                <button type="submit" className="btn btn-warning" onClick={this.onSubmit}>Thêm</button>&nbsp;
                                <button type="submit" 
                                        className="btn btn-danger"
                                        onClick={this.onClear} onClick={this.onCloseForm}>Hủy Bỏ
                                </button>
                            </div>
                        </form>
                      
                    </div>
        </div>
    );
  }
}
export default TaskForm;
