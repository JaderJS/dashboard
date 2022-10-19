import { Row, Col, Container } from 'react-bootstrap'

import Sidebar from './components/dashboard/Sidebar/index'
import sidebar_menu from './constants/sidebar-menu'
import DashboardHeader from './components/dashboard/DashboardHeader/index'

import Station from './components/station/Main'

import './App.css'

const App = () => {
  return (
    <div id='container'>
      <Container fluid>
        <Row>
          <Col xs={2} className='p-0 m-0'>
            <Sidebar menu={sidebar_menu} />
          </Col>
          <Col>
            <DashboardHeader btnText={'New'} />
            <div id='main' className='p-4'>
              <Station />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
