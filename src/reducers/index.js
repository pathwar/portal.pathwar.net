import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

function entities(state = { users: {}, levels: {} }, /*action*/) {
  return state
}

const rootReducer = combineReducers({
  entities,
  routing,
})

export default rootReducer
