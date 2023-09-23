import React, {useState, useEffect} from 'react' 
import api from './api'
//import 'bootstrap/dist/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 
import './App.css';
//import '/css/main.min.css'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


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
      
      <header> 
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="#home">Finance App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      
      <main>
        <Container fluid>
          <Row>
            <Col className="col-1 mt-1"></Col>
            <Col>
              <Form className="mt-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>


        <div className="container mt-5">
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
      </main>

      <header> 
        <Navbar expand="lg" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="#home">Finance App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Row className="px-4 my-5">
            <Col sm={7}>
              <Image 
                src="https://picsum.photos/900/400"
                fluid
                rounded
              />;
            </Col>
            <Col sm={5}>
              <h1 class='font-weight-light'>Tagline</h1>
              <p class='mt-4'>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
              <Button>
                Call to Action
              </Button>
              
            </Col>
          </Row>
          <Row>
            <Card className='text-center bg-secondary text-white my-5 py-4'>
              <Card.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Card.Body>
            </Card>
          </Row>
          <Row>
          <Col>  
              <Card style={{ width: '18rem' }}>
          `     <Card.Img variant="top" src="https://picsum.photos/id/237/320/200" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>`
            </Col>
            <Col>  
              <Card style={{ width: '18rem' }}>
          `     <Card.Img variant="top" src="https://picsum.photos/id/432/320/200" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>`
            </Col>
            <Col>  
              <Card style={{ width: '18rem' }}>
          `     <Card.Img variant="top" src="https://picsum.photos/id/500/320/200" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>`
            </Col>
          </Row>
        </Container>
      </main>
      <footer class='py-5 my-5 bg-dark'>
        <Container className='px-4'>
          <p class='text-center text-white'>Copyright &copy; Your Website 2023</p>
        </Container>
      </footer>

    </div>
  )
}

export default App;
