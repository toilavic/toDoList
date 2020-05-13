import React, {Component} from 'react';

class Sort extends Component {

	onClick = (name, val) => {
		this.props.onSort(name, val);
	}
  render(){
    return (   
	        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
	                        <div className="dropdown">
	                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
	                                Sort <span className="fa fa-caret-square-o-down ml-5"></span>
	                            </button>
	                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
	                                <li onClick = { () => this.onClick('name', 1)}>
	                                    <a role="button">
	                                                <span className="fa fa-sort-alpha-asc">
	                                                    Order A-Z
	                                                </span>
	                                    </a>
	                                </li>
	                                <li onClick = { () => this.onClick('name', -1)}>
	                                    <a role="button">
	                                                <span className="fa fa-sort-alpha-desc">
	                                                    Order Z-A
	                                                </span>
	                                            </a>
	                                </li>
	                                <li role="separator" className="divider"></li>
	                                <li onClick = { () => this.onClick('status', 1)}>
	                                	<a role="button">Active</a>
	                                </li>
	                                <li onClick = { () => this.onClick('status', -1)}>
	                                	<a role="button">De-active</a>
	                                </li>
	                            </ul>
	                        </div>
	        	</div>
    );
  }
}
export default Sort;
