import React from 'react';

const TaskOverview = ({ tasks }) => {
  return (
    <div>
      <h2>Task Overview</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskOverview;
