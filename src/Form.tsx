import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Entry, EntryType } from './types'

function Form ({ addEntry } : { addEntry : ((e : Entry) => void)}) {
  const [type, setType] = useState<EntryType>('Income')
  const [name, setName] = useState('')
  const [value, setValue] = useState(0)

  // handleCurrency handles input and tries to set value to its appropriate amount.
  const handleCurrency = (input : string) : void => {
    if (input === '') {
      setValue(0)
      return
    }

    // Check if string is even a valid number.
    // See https://stackoverflow.com/a/175787/14020202.
    if (isNaN(Number(input)) || isNaN(parseFloat(input))) {
      return
    }

    // Otherwise do things here...
    const splitViaDecimalPoint = input.split('.')
    switch (splitViaDecimalPoint.length) {
      case 1:
        setValue(parseFloat(input))
        return
      case 2:
        if (splitViaDecimalPoint[1].length <= 2) {
          setValue(parseFloat(input))
        }
    }
  }

  // onRadioButtonChange is onHandleChange for the radio button and type
  const onRadioButtonChange = (e : ChangeEvent<HTMLInputElement>) : void => {
    setType(e.target.value as EntryType)
  }

  // handleSubmit handles submission of the form using addEntry
  const handleSubmit = (e : FormEvent<HTMLFormElement>) : void => {
    e.preventDefault()
    addEntry({ type: type, name: name, value: value })
    setType('Income')
    setName('')
    setValue(0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div id='type-select'>
        Item type:
        <label>
          <input type='radio' value='Income' checked={type === 'Income'} onChange={onRadioButtonChange} /> Income
        </label>
        <label>
          <input type='radio' value='Expense' checked={type === 'Expense'} onChange={onRadioButtonChange} /> Expense
        </label>
      </div>
      <div id='name-select'>
        <label>
          Item name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
      </div>
      <div id='value-select'>
        <label>
          Item value:
          <input type='number' value={value} onChange={e => handleCurrency(e.target.value)} />
        </label>
      </div>
      <input type='submit' value='Add' />
    </form>
  )
}

export default Form
