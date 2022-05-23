import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducer';
import thunk from 'redux-thunk';


const store = createStore(
   rootReducer,
   compose(
      applyMiddleware(thunk)
   )   
);


export default store;