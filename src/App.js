import './App.css';
import { useEffect, useState } from 'react';
import List from './components/List';
import Alert from './components/Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(false);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      // display alert
      showAlert(true, 'danger', 'Please enter a value');
      
    } else if(name && isEditing) {
      // deal with edit
      setList(list.map((item) => {
        if(item.id === editID) {
          return {...item, title: name};
        }
        return item;
      }));
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    }
    else {
      // show alert 
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName('');

    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  }

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  // lolcal storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]); 

  return (
    <div className='container mt-5 text-center card shadow p-3 border-0' style={{ width: '32rem' }}>
      <form onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>Grocery bud</h3>
          <div className='d-flex justify-content-around mb-3'>
            <input type='text' placeholder='eg. eggs' value={name} onChange={(e) => setName(e.target.value)} className='border-0 bg-dark text-light p-2 rounded col-md-9' />
            <button type='submit' className='btn btn-success'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
      </form>
      {/* {list.length > 0} */}
      <div>
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button className='btn btn-primary' onClick={clearList} >
          Clear Items
        </button>
      </div>
    </div>
  );
}

export default App;
