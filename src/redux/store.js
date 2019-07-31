/**
 * Created by flyTigger on 2019/7/30.
 */
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import reducres from "./reducres"

export default createStore(reducres, composeWithDevTools(applyMiddleware(thunk)))