import React from 'react'
import { Entry } from './types'

function Table ({ entries } : { entries : Entry[] }) {
  const totalIncome = entries.reduce((prev, cur) => cur.type === 'Income' ? prev + cur.value : prev, 0)
  const totalExpense = entries.reduce((prev, cur) => cur.type === 'Expense' ? prev + cur.value : prev, 0)
  const netAmount = totalIncome - totalExpense

  return (
    <table id='table'>
      <thead>
        <tr>
          <th>Items</th>
          <th>Income</th>
          <th>Expenses</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {entries.map((entry, ind) => (
          <tr key={ind}>
            <td>{entry.name}</td>
            <td>{entry.type === 'Income' ? '$' + entry.value.toFixed(2) : ''}</td>
            <td>{entry.type === 'Expense' ? '$' + entry.value.toFixed(2) : ''}</td>
            <td></td>
          </tr>
        ))}
        <tr>
          <td style={{ fontWeight: 'bold' }}>Total</td>
          <td>{'$' + totalIncome.toFixed(2)}</td>
          <td>{'$' + totalExpense.toFixed(2)}</td>
          <td style={{
            fontWeight: 'bold',
            color: (netAmount < 0) ? 'red' : 'inherit'
          }}>{'$' + Math.abs(netAmount).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table
