import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Button, Form } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'

const initialValues = {
    model: 'PD406',
    sn: '20D67419B',
    name: 'José',
    user: 'LKR',
    id: '1000',
    obs: 'asdas',
    date: '2022-09-09T21:26:41.960Z',
    key: '1210saldksaa'
}

const Radios = ({ id }) => {

    const [values, setValues] = useState([initialValues])
    const [show, setShow] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    const [bufferValues, setBufferValues] = useState()

    const del = async (_id) => {
        await axios.delete(`http://127.0.0.1:3010/api/radio/${_id}`).then(() => {
        }).catch((error) => {
            alert(error.response.data.msg)
        })
    }

    const update = (value) => {
        setBufferValues(value)
        setShowUpdate((previus) => !previus)
    }

    const add = (value) => {
        setBufferValues(value)
        setShow((previus) => !previus)
    }

    useEffect(() => {
        const get = async () => {
            await axios.get('http://127.0.0.1:3010/api/radio').then((response) => {
                setValues(() => response.data)
            }).catch((error) => {
                alert(error.response.data.msg)
            })
        }
        get()
    }, [values])

    const HandlerRadio = () => {

        const myFilter = values.filter((value) => {
            return value.key === id
        })

        const mySort = myFilter.sort((a, b) => a.id - b.id)

        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Modelo</th>
                            <th>id</th>
                            <th>Usuário</th>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>S.N</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mySort.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{value.model}</td>
                                    <td>{value.id}</td>
                                    <td>{value.user}</td>
                                    <td>{value.name}</td>
                                    <td>{value.date}</td>
                                    <td>{value.sn}</td>
                                    <td><Button variant='warning' onClick={() => update(value)}>Editar</Button></td>
                                    <td><Button variant='danger' onClick={() => del(value._id)}>Deletar</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )

    }

    return (
        <>{values && values.find((value) => value.key === id) ? <>
            <HandlerRadio />
            <Button variant='primary' onClick={() => setShow((previus) => !previus)}>Adicionar rádio</Button>
        </> : <>
            <h5>Sem equipamentos cadastrados</h5>
            <Button variant='primary' onClick={() => add(values)}>Adicionar rádio</Button>
        </>}
            {show && <AddRadio show={show} setShow={setShow} _id={id} />}
            {showUpdate && <UpdateRadio show={showUpdate} setShow={setShowUpdate} value={bufferValues} />}
        </>
    )
}

const UpdateRadio = ({ show, setShow, value }) => {
    const [val, setVal] = useState(value)

    const handlerText = (event) => {
        setVal((previus) => (
            { ...previus, [event.target.name]: event.target.value }
        ))
        console.log(val)
    }

    const handleUpdateBtn = async (_id) => {
        await axios.patch(`http://127.0.0.1:3010/api/radio/${_id}`, val).then(() => {
            setShow(false)
        }).catch((error) => {
            alert(error.response.data.msg)
        })
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
                            <Form.Label className="mt-1" >Modelo</Form.Label>
                            <Form.Control type="text" name='model' placeholder="Modelo de rádio. Ex: PD406" value={val.model} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >Número serial</Form.Label>
                            <Form.Control type="text" name='sn' placeholder="Número de série do equipamento" value={val.sn} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >Usuário</Form.Label>
                            <Form.Control type="text" name='user' placeholder="Usuário" value={val.user} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >Nome</Form.Label>
                            <Form.Control type="text" name='name' placeholder="Nome" value={val.name} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >id</Form.Label>
                            <Form.Control type="text" name='id' placeholder="id" value={val.id} onChange={(event) => handlerText(event)} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <p className='text-muted'>{val.key}</p>
                    <Button variant="secondary" onClick={() => setShow(false)}>Fechar</Button>
                    <Button variant="success" onClick={() => handleUpdateBtn(val._id)}>Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const AddRadio = ({ show, setShow, _id }) => {
    const [val, setVal] = useState({ ...initialValues, key: _id })

    const handlerText = (event) => {
        setVal((previus) => (
            { ...previus, [event.target.name]: event.target.value, key: _id }
        ))
        console.log(val)
    }

    const handleSaveBtn = async (val) => {
        setVal((previus) => ({ ...previus, key: _id }))
        await axios.post('http://127.0.0.1:3010/api/radio', val).then(() => {
            setShow(false)
        }).catch((error) => {
            alert(error.response.data.msg)
        })
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
                            <Form.Label className="mt-1" >Modelo</Form.Label>
                            <Form.Control type="text" name='model' placeholder="Modelo de rádio. Ex: PD406" value={val.model} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >Número serial</Form.Label>
                            <Form.Control type="text" name='sn' placeholder="Número de série do equipamento" value={val.sn} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >Usuário</Form.Label>
                            <Form.Control type="text" name='user' placeholder="Usuário" value={val.user} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >Nome</Form.Label>
                            <Form.Control type="text" name='name' placeholder="Nome" value={val.name} onChange={(event) => handlerText(event)} />

                            <Form.Label className="mt-3" >id</Form.Label>
                            <Form.Control type="text" name='id' placeholder="id" value={val.id} onChange={(event) => handlerText(event)} />
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

export default Radios
