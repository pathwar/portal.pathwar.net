import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

import createSagaMiddleware from 'redux-saga'
import { helloSaga } from '../sagas'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
    applyMiddleware(thunk)
  )

  sagaMiddleware.run(helloSaga)

  return store
}
