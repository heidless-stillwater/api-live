import React, {useState, useEffect} from 'react' 
import api from './api'
import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    expense_id: '',
    time_created: '',
    cost: '',
    description: '',
    category: ''
  });

  const fetchExpenses = async () => {
    const response = await api.get('/expenses/');
    setExpenses(response.data)
  }
  
  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/expenses/', formData);
    fetchExpenses();
    setFormData({
      expense_id: '',
      time_created: '',
      cost: '',
      description: '',
      category: ''
    });
  };

  return(
    <div>
      <nav className='navbar, navbar-dark, bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='https://mimeworks.com'>
            Finance App
          </a>  
        </div>
      </nav>
      <Button>this is a button</Button>
      <div className="container">
        <form onSubmit={handleFormSubmit}>

        <div className='mb-3'>
          <label htmlFor='cost' className='form-label'>
            Cost
          </label>
          <input type='text' className='form-control' id='cost' name='cost' onChange={handleInputChange} value={formData.cost}/>
        </div>

        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}/>
        </div>

        <div className='mb-3'>
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button> 
      </form>
      <table className='table table-stripe table-bordered table-hover'>
      <thead>
        <tr>
          <td>Time Created</td>
          <td>Cost</td>
          <td>Description</td>
          <td>Category</td>
        </tr>
      </thead> 
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.expense_id}>
            <td>{expense.time_created}</td>
            <td>{expense.cost}</td>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
          </tr>
        ))}
      </tbody>
      </table>
      </div>
    </div>
  )
}

export default App;
