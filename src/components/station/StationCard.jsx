import React, { useState } from 'react'

import axios from 'axios'

import { Button, Card, Table, Accordion, Row, Col } from 'react-bootstrap'

import { FaTrashAlt, FaEdit, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa'

import { EditStation } from './ApiStation'

import Groups from './Groups'
import Location from './Location'
import Radios from './Radios'
import { FileStorage, GetFiles } from './FileStorage'

const StationCard = ({ data }) => {

    const [show, setShow] = useState()
    const [showEditStation, setShowEditStation] = useState(false)
    const [values, setValues] = useState({ ...data })

    const del = async (id) => {
        await axios.delete(`http://127.0.0.1:3010/api/station/${id}`).then((response) => {
            console.log(`${id} excluido`)
            alert(response.data.msg)
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <>
            <EditStation show={showEditStation} setShow={setShowEditStation} value={values} />
            <Card>
                <Card.Header>
                    <div className='hstack gap-4'>
                        <div><h3>{values.property}</h3></div>
                        <div className=" ms-auto">
                            <Button variant='primary' onClick={() => setShow(prevStatus => !prevStatus)}>{show ? <FaRegArrowAltCircleDown /> : <FaRegArrowAltCircleUp />}</Button>
                        </div>
                        <div >
                            <Button variant='warning' onClick={() => setShowEditStation(prevStatus => !prevStatus)}><FaEdit /></Button>
                        </div>
                        <div className="vr"></div>
                        <div>
                            <Button variant='danger' onClick={() => del(values._id)}><FaTrashAlt /></Button>
                        </div>
                    </div>
                </Card.Header>

                {show && <Card.Body>
                    <Card.Title>{values.manager}</Card.Title>
                    <Row>
                        <Col>
                            <Location latitude={values.latitude} longitude={values.longitude} />
                            <div>Latitude:{values.latitude} </div>
                            <div>Longitude:{values.longitude}</div>
                        </Col>
                        <Col>
                            <h5>Contato</h5>
                        </Col>
                    </Row>

                    {values.type.digital &&
                        <>
                            <h5>Digital</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Frequência RX (MHz)</th>
                                        <th>Frequência TX (MHz)</th>
                                        <th>Código de cor</th>
                                        <th>Slot</th>
                                        <th>Grupos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{values._id}</td>
                                        <td>{values.frequencyRx}</td>
                                        <td>{values.frequencyTx}</td>
                                        <td>{values.type.digital.colorCode}</td>
                                        <td>{values.type.digital.slot}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Accordion defaultActiveKey={['1']} alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Grupos</Accordion.Header>
                                    <Accordion.Body>
                                        <Groups id={values._id} />
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Rádios</Accordion.Header>
                                    <Accordion.Body>
                                        <Radios id={values._id} />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </>
                    }
                    {values.type.analog &&
                        <>
                            <h5>Analógico</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Frequência RX (MHz)</th>
                                        <th>Frequência TX (MHz)</th>
                                        <th>Silenciador</th>
                                        {values.type.analog.typeDecoder.tpl && <>
                                            <th>Encoder</th>
                                            <th>Decoder</th>
                                        </>}
                                        {values.type.analog.typeDecoder.dpl && <>
                                            <th>Encoder</th>
                                            <th>Decoder</th>
                                        </>}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{values._id}</td>
                                        <td>{values.frequencyRx}</td>
                                        <td>{values.frequencyTx}</td>
                                        {values.type.analog.typeDecoder.csq && <td>CSQ</td>}
                                        {values.type.analog.typeDecoder.tpl && <>
                                            <td>TPL</td>
                                            <td>{values.type.analog.typeDecoder.tpl.encoder}</td>
                                            <td>{values.type.analog.typeDecoder.tpl.decoder}</td>
                                        </>}
                                        {values.type.analog.typeDecoder.dpl && <>
                                            <td>DPL</td>
                                            <td>{values.type.analog.typeDecoder.dpl.encoder}</td>
                                            <td>{values.type.analog.typeDecoder.dpl.decoder}</td>
                                        </>}
                                    </tr>
                                </tbody>
                            </Table>
                        </>
                    }
                    <FileStorage id={values._id} />
                    <GetFiles id={values._id} />
                </Card.Body>
                }
                <Card.Footer className="text-muted text-center">{values.dataCreted}  <p>{values._id}</p></Card.Footer>
            </Card>
        </>
    )
}



export default StationCard