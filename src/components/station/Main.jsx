import { useState } from 'react'

import { Button, Col, Row, InputGroup, Form } from 'react-bootstrap'

import { AddStation } from './ApiStation'

import Stations from './Stations'

import './styles.css'

const MainBar = () => {

    const [show, setShow] = useState()

    return (
        <Col>
            <div id='main-bar' className='text-center'>
                <Row>
                    <Col>
                        <Button variant='primary' size='lg' onClick={() => setShow((previus) => !previus)} >New</Button>
                    </Col>
                    <Col xs={7}>
                        <h2>Sistema de gerenciamento e cadastro de estações</h2>
                    </Col>
                    <Col xs={3}>
                        <InputGroup className="mb-2">
                            <Form.Control placeholder="Procura" />
                            <Button variant="outline-success">Procurar</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Stations />
                <AddStation show={show} setShow={setShow} />
            </div >
        </Col >
    )
}

export default MainBar