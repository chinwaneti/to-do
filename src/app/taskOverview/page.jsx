import React from 'react'

export default function page({tasks}) {
  return (
    <div> <div>
    <h2>Task Overview</h2>
    <ul>
      {/* {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.description}</span>
        </li>
      ))} */}
    </ul>
  </div></div>
  )
}
