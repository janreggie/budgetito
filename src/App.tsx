import React, { useReducer } from 'react'
import Form from './Form'
import Table from './Table'
import { Action, State } from './types'
import './App.css'

function App () {
  const reducer = (state : State, action : Action) : State => {
    switch (action.type) {
      case 'clear':
        return { entries: [] }
      case 'add':
        return { entries: [...state.entries, action.entry] }
    }
  }
  const [state, dispatch] = useReducer(reducer, { entries: [] })
  console.log(state)

  return (
    <div className="App">
      <h1>My Budget</h1>
      <Form addEntry={(entry) => dispatch({ type: 'add', entry: entry })} />
      <Table entries={state.entries} />
      <input type='button' onClick={() => dispatch({ type: 'clear' })} value='Clear' />
    </div>
  )
}

export default App
