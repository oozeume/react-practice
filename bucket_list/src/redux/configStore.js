import { createStore, combineReducers } from "redux";
import bucket from "./modules/bucket";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory();

//combineReducer를 이용해서 리듀서를 하나로 뭉쳐줄거다.
// 뭉쳐진 reducer 이름을 rootReducer라고 할거다.
// 우리가 만들었던 reducer를 중괄호 안에 넘겨준다. 
const rootReducer = combineReducers({bucket});


// store는 createStore()로 만들 수 있다. 
const store = createStore(rootReducer);

export default store;