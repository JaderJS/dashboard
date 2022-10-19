import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Button, Form, Table, Modal, FloatingLabel } from 'react-bootstrap'

const initialValues = [{
    name: 'TG1',
    user: 'Mecânica',
    type: 'group',
    id: '1',
    tone: 'none',
}]

const Groups = ({ id }) => {
    const [values, setValues] = useState(initialValues)
    const [show, setShow] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    const [bufferValues, setBufferValues] = useState()

    const get = async () => {
        await axios.get('http://127.0.0.1:3010/api/group').then((response) => {
            setValues(response.data)
        }).catch((error) => {
            alert(error.response.data.msg)
        })

    }

    const del = async (_id) => {
        await axios.delete(`http://127.0.0.1:3010/api/group/${_id}`).then(() => {
        }).catch((error) => {
            console.error(error)
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

    const HandlerGroup = () => {
        const myArray = values.filter((value) => {
            return value.key === id
        })
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Usuários</th>
                        <th>Tipo</th>
                        <th>id</th>
                        <th>Sinalização</th>
                        <th>Data</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {myArray.map((value, index) => {
                        if (value.key !== id) {
                            return null
                        }
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{value.name}</td>
                                <td>{value.user}</td>
                                <td>{value.type}</td>
                                <td>{value.id}</td>
                                <td>{value.tone}</td>
                                <td>{value.date}</td>
                                <td><Button variant='warning' onClick={() => update(value)}>Editar</Button></td>
                                <td><Button variant='danger' onClick={() => del(value._id)}>Deletar</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    useEffect(() => {
        get()
    }, [values])


    return (
        <>{values.find((value) => value.key === id) ? <>
            <HandlerGroup />
            <Button variant='primary' onClick={() => setShow((previus) => !previus)}>Adicionar Grupo</Button>
        </> : <>
            <h5>Sem Grupos cadastrados</h5>
            <Button variant='primary' onClick={() => add(values)}>Adicionar Grupo</Button>
        </>}
            {show && <AddGroup show={show} setShow={setShow} _id={id} />}
            {showUpdate && <UpdateGroup show={showUpdate} setShow={setShowUpdate} value={bufferValues} />}
        </>
    )
}

const UpdateGroup = ({ show, setShow, value }) => {
    const [val, setVal] = useState(value)

    const handlerText = (event) => {
        setVal((previus) => (
            { ...previus, [event.target.name]: event.target.value }
        ))
        console.log(val)
    }

    const handleUpdateBtn = async (_id) => {
        await axios.patch(`http://127.0.0.1:3010/api/group/${_id}`, val).then(() => {
            setShow(false)
        }).catch((error) => {
            alert(error.response.data.msg)
        })
    }

    return (
        <>
            <Modal show={show} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="formradio">
                            <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
                                <Form.Control type="text" name='name' value={val.model} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="formradio" label="Usuário" className="mb-3">
                                <Form.Control type="text" name='user' value={val.user} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingSelect" label="Tipo de grupo" className="mb-3" >
                                <Form.Select aria-label="Floating label select example" name='type' value={val.type} onChange={(event) => handlerText(event)}>
                                    <option>Selecione o tipo de grupo</option>
                                    <option value="alway">Alway</option>
                                    <option value="group">Group</option>
                                    <option value="individual">Individual</option>
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="formradio" label="id" className="mb-3">
                                <Form.Control type="text" name='id' value={val.id} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="formradio" label="Tipo de sinalização" className="mb-3">
                                <Form.Control type="text" name='tone' value={val.tone} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
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

const AddGroup = ({ show, setShow, _id }) => {
    const [val, setVal] = useState(...initialValues)

    const handlerText = (event) => {
        setVal((previus) => (
            { ...previus, [event.target.name]: event.target.value, key: _id }
        ))
        console.log(val)
    }

    const handleSaveBtn = async (val) => {
        setVal((previus) => ({ ...previus, key: _id }))
        await axios.post('http://127.0.0.1:3010/api/group', val).then(() => {
            setShow(false)
        }).catch((error) => {
            alert(error.response.data.msg)
        })
    }

    return (
        <>
            <Modal show={show} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="formradio">
                            <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3">
                                <Form.Control type="text" name='name' value={val.model} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="formradio" label="Usuário" className="mb-3">
                                <Form.Control type="text" name='user' value={val.user} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingSelect" label="Tipo de grupo" className="mb-3" >
                                <Form.Select aria-label="Floating label select example" name='type' value={val.type} onChange={(event) => handlerText(event)}>
                                    <option>Selecione o tipo de grupo</option>
                                    <option value="alway">Alway</option>
                                    <option value="group">Group</option>
                                    <option value="individual">Individual</option>
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="formradio" label="id" className="mb-3">
                                <Form.Control type="text" name='id' value={val.id} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
                            <FloatingLabel controlId="formradio" label="Tipo de sinalização" className="mb-3">
                                <Form.Control type="text" name='tone' value={val.tone} onChange={(event) => handlerText(event)} />
                            </FloatingLabel>
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


export default Groups