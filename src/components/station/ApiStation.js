import { useState } from "react"

import { Modal, Form, Button, Row, Col } from 'react-bootstrap'

import axios from 'axios'

const initialValuesStationDigital = {
    property: 'Jader',
    manager: 'Jader',
    frequencyRx: '158',
    frequencyTx: '158',
    latitude: `-15.6103616`,
    longitude: `-56.0510106`,
    description: 'Repetidora',
    dataCreted: '2022-09-09T21:26:41.960Z',
    type: {},
}

const AddStation = ({ show, setShow }) => {

    const [val, setVal] = useState(initialValuesStationDigital)

    const handlerText = (event) => {
        setVal((previus) => (
            { ...previus, [event.target.name]: event.target.value }
        ))
        console.log(val)
    }

    const handleSaveBtn = async () => {

        if (Object.getOwnPropertyNames(val.type).length === 0) {
            return alert('Verifique o modo de operação')
        } else {

            await axios.post('http://127.0.0.1:3010/api/station', val).then(() => {
                setShow(false)
            }).catch((error) => {
                console.error(error)
                alert(error.response.data.msg)
            })

        }
    }

    return (
        <>
            <Modal show={show} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar rádio</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="formradio">
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label className="mt-3" >Propriedade</Form.Label>
                                    <Form.Control type="text" name='property' placeholder="Propriedade" value={val.property} onChange={(event) => handlerText(event)} />
                                </Col>
                                <Col md>
                                    <Form.Label className="mt-3" >Gerente</Form.Label>
                                    <Form.Control type="text" name='manager' placeholder="Gerente" value={val.manager} onChange={(event) => handlerText(event)} />
                                </Col>
                            </Row>
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label className="mt-3" >Frequência RX</Form.Label>
                                    <Form.Control type="text" name='frequencyRx' placeholder="Frequência RX (MHz)" value={val.frequencyRx} onChange={(event) => handlerText(event)} />
                                </Col>
                                <Col md>
                                    <Form.Label className="mt-3" >Frequência TX</Form.Label>
                                    <Form.Control type="text" name='frequencyTx' placeholder="Frequência TX (MHz)" value={val.frequencyTx} onChange={(event) => handlerText(event)} />
                                </Col>
                            </Row>
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label className="mt-3" >Latitude</Form.Label>
                                    <Form.Control type="text" name='latitude' placeholder="Latitude" value={val.latitude} onChange={(event) => handlerText(event)} />
                                </Col>
                                <Col md>
                                    <Form.Label className="mt-3" >Longitude</Form.Label>
                                    <Form.Control type="text" name='longitude' placeholder="Longitude" value={val.longitude} onChange={(event) => handlerText(event)} />
                                </Col>
                            </Row>

                            <Form.Label className="mt-3" >Modo de operação</Form.Label>
                            <Form.Select name='type' aria-label="Default select example" onChange={(event) => {
                                setVal((previus) => ({
                                    ...previus, [event.target.name]: { [event.target.value]: {} }
                                }))
                            }}>
                                <option>Selecione o modo de operação</option>
                                <option value="digital">Digital</option>
                                <option value="analog">Analógico</option>
                            </Form.Select>

                            {val.type.digital &&
                                <>
                                    <Form.Label className="mt-3" >Código de cor</Form.Label>
                                    <Form.Control type="list" name='colorCode' placeholder="Código de cor" value={val.type.digital.colorCode} onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { digital: { ...previus.type.digital, [event.target.name]: event.target.value } }
                                        }))
                                    }} />
                                    <Form.Label className="mt-3" >Slot</Form.Label>
                                    <Form.Control type="list" name='slot' placeholder="Slot de operação" value={val.type.digital.slot} onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { digital: { ...previus.type.digital, [event.target.name]: event.target.value } }
                                        }))
                                    }} />
                                </>
                            }
                            {val.type.analog &&
                                <>
                                    <Form.Label className="mt-3" >Tipo de silenciador</Form.Label>
                                    <Form.Select name='typeDecoder' aria-label="Default select example" onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { analog: { typeDecoder: { [event.target.value]: event.target.value } } }
                                        }))
                                    }}>
                                        <option>Selecione o modo de operação</option>
                                        <option value="csq">CSQ</option>
                                        <option value="tpl">TPL</option>
                                        <option value="dpl">DPL</option>
                                    </Form.Select>


                                    <Form.Label className="mt-3" >Banda</Form.Label>
                                    <Form.Select name='band' aria-label="Default select example" onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { analog: { ...previus.type.analog, [event.target.name]: event.target.value } }
                                        }))
                                    }}>
                                        <option>Selecione o modo de operação</option>
                                        <option value="25KHz">25KHz</option>
                                        <option value="20Hz">20KHz</option>
                                        <option value="12.5Hz">12.5KHz</option>
                                    </Form.Select>
                                    {val.type.analog.typeDecoder &&
                                        <>
                                            {val.type.analog.typeDecoder.tpl &&
                                                <>
                                                    <Form.Label className="mt-3" >Encoder</Form.Label>
                                                    <Form.Control type="list" name='encoder' placeholder="Encoder" value={val.type.analog.typeDecoder.tpl.encoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { tpl: { ...previus.type.analog.typeDecoder.tpl, [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                    <Form.Label className="mt-3" >Decoder</Form.Label>
                                                    <Form.Control type="list" name='decoder' placeholder="Decoder" value={val.type.analog.typeDecoder.tpl.decoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { tpl: { ...previus.type.analog.typeDecoder.tpl, [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                </>
                                            }
                                            {val.type.analog.typeDecoder.dpl &&
                                                <>
                                                    <Form.Label className="mt-3" >Encoder</Form.Label>
                                                    <Form.Control type="list" name='encoder' placeholder="Encoder" value={val.type.analog.typeDecoder.dpl.encoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { dpl: { ...previus.type.analog.typeDecoder.dpl, [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                    <Form.Label className="mt-3" >Decoder</Form.Label>
                                                    <Form.Control type="list" name='decoder' placeholder="Decoder" value={val.type.analog.typeDecoder.dpl.decoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { dpl: { ...previus.type.analog.typeDecoder.dpl, [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                </>
                                            }
                                        </>
                                    }

                                </>
                            }

                            <Form.Label className="mt-3" >Descrição</Form.Label>
                            <Form.Control type="text" name='description' placeholder="Descrição" value={val.description} onChange={(event) => handlerText(event)} />

                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <p className='text-muted'>{val.key}</p>
                    <Button variant="secondary" onClick={() => setShow(false)}>Fechar</Button>
                    <Button variant="success" onClick={() => handleSaveBtn(val)}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const EditStation = ({ show, setShow, value }) => {

    const [val, setVal] = useState(value)

    const handlerText = (event) => {
        setVal((previus) => (
            { ...previus, [event.target.name]: event.target.value }
        ))
    }

    const handleSaveBtn = async () => {
        console.log(val)
        await axios.patch(`http://127.0.0.1:3010/api/station/${value._id}`, val).then(() => {
            setShow(false)
        }).catch((error) => {
            console.error(error)
            alert(error.response.data.msg)
        })
    }

    return (
        <>
            {console.log(value)}
            <Modal show={show} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar estação de rádio</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="formradio">
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label className="mt-3" >Propriedade</Form.Label>
                                    <Form.Control type="text" name='property' placeholder="Propriedade" value={val.property} onChange={(event) => handlerText(event)} />
                                </Col>
                                <Col md>
                                    <Form.Label className="mt-3" >Gerente</Form.Label>
                                    <Form.Control type="text" name='manager' placeholder="Gerente" value={val.manager} onChange={(event) => handlerText(event)} />
                                </Col>
                            </Row>
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label className="mt-3" >Frequência RX</Form.Label>
                                    <Form.Control type="text" name='frequencyRx' placeholder="Frequência RX (MHz)" value={val.frequencyRx} onChange={(event) => handlerText(event)} />
                                </Col>
                                <Col md>
                                    <Form.Label className="mt-3" >Frequência TX</Form.Label>
                                    <Form.Control type="text" name='frequencyTx' placeholder="Frequência TX (MHz)" value={val.frequencyTx} onChange={(event) => handlerText(event)} />
                                </Col>
                            </Row>
                            <Row className='g-2'>
                                <Col md>
                                    <Form.Label className="mt-3" >Latitude</Form.Label>
                                    <Form.Control type="text" name='frequencyTx' placeholder="Frequência TX (MHz)" value={val.latitude} onChange={(event) => handlerText(event)} />
                                </Col>
                                <Col md>
                                    <Form.Label className="mt-3" >Longitude</Form.Label>
                                    <Form.Control type="text" name='frequencyTx' placeholder="Frequência TX (MHz)" value={val.longitude} onChange={(event) => handlerText(event)} />
                                </Col>
                            </Row>


                            <Form.Label className="mt-3" >Modo de operação</Form.Label>
                            <Form.Select name='type' aria-label="Default select example" value={val.type.digital ? 'digital' : 'analog'} onChange={(event) => {
                                setVal((previus) => ({
                                    ...previus, [event.target.name]: { [event.target.value]: {} }
                                }))
                            }}>
                                <option>Selecione o modo de operação</option>
                                <option value="digital">Digital</option>
                                <option value="analog">Analógico</option>
                            </Form.Select>

                            {val.type.digital &&
                                <>
                                    <Form.Label className="mt-3" >Código de cor</Form.Label>
                                    <Form.Control type="list" name='colorCode' placeholder="Código de cor" value={val.type.digital.colorCode} onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { digital: { [event.target.name]: event.target.value } }
                                        }))
                                    }} />
                                    <Form.Label className="mt-3" >Slot</Form.Label>
                                    <Form.Control type="list" name='slot' placeholder="Slot de operação" value={val.type.digital.slot} onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { digital: { [event.target.name]: event.target.value } }
                                        }))
                                    }} />
                                </>
                            }
                            {val.type.analog &&
                                <>

                                    <Form.Label className="mt-3" >Tipo de silenciador</Form.Label>
                                    <Form.Select name='typeDecoder' aria-label="Default select example" onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { analog: { ...previus.type.analog, typeDecoder: { [event.target.value]: event.target.value } } }
                                        }))
                                    }}
                                        value={
                                            val.type.analog.typeDecoder.csq ? 'csq' : (val.type.analog.typeDecoder.tpl ? 'tpl' : 'dpl')
                                        }
                                    >
                                        <option>Selecione o modo de operação</option>
                                        <option value="csq">CSQ</option>
                                        <option value="tpl">TPL</option>
                                        <option value="dpl">DPL</option>
                                    </Form.Select>


                                    <Form.Label className="mt-3" >Banda</Form.Label>
                                    <Form.Select name='band' aria-label="Default select example" value={val.type.analog.band} onChange={(event) => {
                                        setVal((previus) => ({
                                            ...previus, type: { analog: { ...previus.type.analog, [event.target.name]: event.target.value } }
                                        }))
                                    }}>
                                        <option>Selecione o modo de operação</option>
                                        <option value="25KHz">25KHz</option>
                                        <option value="20Hz">20KHz</option>
                                        <option value="12.5Hz">12.5KHz</option>
                                    </Form.Select>
                                    {val.type.analog.typeDecoder &&
                                        <>
                                            {val.type.analog.typeDecoder.tpl &&
                                                <>
                                                    <Form.Label className="mt-3" >Encoder</Form.Label>
                                                    <Form.Control type="list" name='encoder' placeholder="Encoder" value={val.type.analog.typeDecoder.tpl.encoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { tpl: { [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                    <Form.Label className="mt-3" >Decoder</Form.Label>
                                                    <Form.Control type="list" name='decoder' placeholder="Decoder" value={val.type.analog.typeDecoder.tpl.decoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { tpl: { [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                </>
                                            }
                                            {val.type.analog.typeDecoder.dpl &&
                                                <>
                                                    <h5>DPL</h5>
                                                    <Form.Label className="mt-3" >Encoder</Form.Label>
                                                    <Form.Control type="list" name='encoder' placeholder="Encoder" value={val.type.analog.typeDecoder.dpl.encoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { dpl: { [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                    <Form.Label className="mt-3" >Decoder</Form.Label>
                                                    <Form.Control type="list" name='decoder' placeholder="Decoder" value={val.type.analog.typeDecoder.dpl.encoder} onChange={(event) => {
                                                        setVal((previus) => ({
                                                            ...previus, type: { analog: { typeDecoder: { dpl: { [event.target.name]: event.target.value } } } }
                                                        }))
                                                    }} />
                                                </>
                                            }
                                        </>
                                    }

                                </>
                            }

                            <Form.Label className="mt-3" >Descrição</Form.Label>
                            <Form.Control type="text" name='description' placeholder="Descrição" value={val.description} onChange={(event) => handlerText(event)} />

                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <p className='text-muted'>{val.key}</p>
                    <Button variant="secondary" onClick={() => setShow(false)}>Fechar</Button>
                    <Button variant="success" onClick={() => handleSaveBtn(val)}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export { AddStation, EditStation }

