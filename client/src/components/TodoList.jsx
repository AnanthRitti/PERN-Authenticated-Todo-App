import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import Modal from './Modal';
import axios from 'axios';

function TodoList({ task, getData }) {
  async function deleteData(e) {
    e.preventDefault();
    const resp = await axios.delete(`http://localhost:3000/todos/${task.id}`);
    if (resp.status === 200) {
      getData();
    }
  }

  const [showModel, setShowModel] = useState(false);

  return (
    <div className="task-list-container">
      <div className='info-container'>
        <CheckCircleIcon className='tick' onClick={() => console.log(task.title)} />
        <p>{task.title}</p>
      </div>
      <div className="btn-container">
        <button className="edit-btn" onClick={() => setShowModel(true)}>EDIT</button>
        <button className="delete-btn" onClick={deleteData}>DELETE</button>
      </div>
      {showModel && <Modal mode={'edit'} task={task} setShowModel={setShowModel} getData={getData} />}
    </div>
  );
}

export default TodoList;
