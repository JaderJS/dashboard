import React, { useRef } from 'react'

import axios from 'axios'

import { Form, InputGroup, Button, Table } from 'react-bootstrap'
import { useEffect } from 'react'
import { useState } from 'react'

const FileStorage = ({ id }) => {

    const filesElement = useRef(null)

    const sendFile = async () => {
        const dataForm = new FormData()
        for (const file of filesElement.current.files) {
            dataForm.append('file', file)
        }
        await axios.post(`http://localhost:3010/file/${id}`, dataForm).then((response) => {
            console.log(response)
            alert(response.data.msg)
        }).catch((error) => {
            alert(error.response.data.error)
            console.error(error)
        })

    }

    return (
        <Form.Group controlId="formFile" className="m-3">
            <Form.Label>Arquivo de configuração</Form.Label>
            <InputGroup>
                <Form.Control type="file" multiple ref={filesElement} />
                <Button variant='primary' onClick={() => sendFile()}>Enviar</Button>
            </InputGroup>
        </Form.Group>
    )
}

const GetFiles = ({ id }) => {

    const [files, setFiles] = useState()

    const delFiles = async (file) => {

        await axios.delete(`http://localhost:3010/file/${id}&${file}`).catch((error) => {
            console.error(error)
        })
    }

    const downloadHandler = (fileName) => {
        axios({
            method: 'get',
            url: 'http://localhost:3010/file/' + id + '/' + fileName,
            responseType: 'blob',
            headers: {},
        })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                alert(error);
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:3010/file/${id}`).then((response) => {
            setFiles(() => response.data.files)
        }).catch((error) => {
            console.error(error)
        }).then()
    }, [files])

    return (
        <>
            {files && <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                {files && files.map((file, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                <td>{file}</td>
                                <td><Button variant='primary' onClick={() => downloadHandler(file)}>Download</Button></td>
                                <td><Button variant='danger' onClick={() => delFiles(file)}>Excluir</Button></td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
            }
        </>
    )
}

const DownloadFile = async ({ id, file }) => {

    await axios.get(`http://localhost:3010/file/download/id=${id}&archive=${file}`).catch((error) => {
        console.error(error)
    })
}

export { FileStorage, GetFiles, DownloadFile }
