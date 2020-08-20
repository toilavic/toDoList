import { createStore } from 'redux';
import { status, sort } from './actions/index'
import myReducer from './reducers/index'

const store = createStore(myReducer);
console.log('origin', store.getState());

// toggle status
store.dispatch(status());
console.log('toggle status', store.getState());

// sort by name Z-A
store.dispatch(sort({
	by: 'name'
	,value : -1
}));
console.log('sort',store.getState());


