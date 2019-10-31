import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import App from './App'
import allReducers from './reducers'
import thunk from 'redux-thunk'

export const storage = createStore(allReducers, applyMiddleware(thunk))
