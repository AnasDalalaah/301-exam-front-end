import React, { Component } from 'react'
import { Modal, Button,Form } from 'react-bootstrap';


class UpdateForm extends Component {
    render() {
        console.log(this.props.name);
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit = {(e) => this.props.updatedData(e)}  >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>name</Form.Label>
                            <Form.Control type="text"  defaultValue={this.props.name} name='name' />
                          
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>img</Form.Label>
                            <Form.Control type="text"  defaultValue={this.props.photo} name='photo'/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>instructions</Form.Label>
                            <Form.Control type="text"  defaultValue={this.props.instructions} name='instructions'/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.handelclose}>
                            Submit
                        </Button>
                    </Form></Modal.Body>
                    <Modal.Footer>
                       
    
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateForm