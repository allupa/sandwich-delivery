import React, { Component } from 'react';
import elclassico from '../images/ElClassico.png'
import eleggo from '../images/ElEggo.png'
import elsuperior from '../images/ElSuperior.png'
import elvegano from '../images/ElVegano.png'
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Carddeck from 'react-bootstrap/CardDeck';
import Modal from 'react-bootstrap/Modal';

import Table from 'react-bootstrap/Table';

import { v4 as uuidv4 } from 'uuid';

class SandwichSelection extends Component{
    constructor(props){
        super(props);
        this.state = {
            response: '',
            post: {'sandiwchId': 6, 'id': 1, 'status': "ordered"},
            responseToPost: '',
            sandwichType: null,
            orderId: null,
            show: false
        }
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({ response: res.json() }))
        .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('http://localhost:12345/v1/order', {
            method: 'GET'
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
      };
      
    handleSubmit = async (sandwich, sandwichType) => {
        var uuid = uuidv4();
        const response = await fetch('http://localhost:12345/v1/order', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'sandwichId': sandwich,
                'id': uuid,
                'status': 'ordered'
            }),
        });
        const body = await response.json();
        this.setState({ 
                sandwichType: sandwichType,
                orderId: uuid
             });
        this.handleShow();
    };

    render(){
        return (
            <Container className="p-3">
                <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>You're order details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Sandwich Type</th>
                                <th>Order ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.sandwichType}</td>
                                <td>{this.state.orderId}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
                </Modal>
                <Jumbotron>
                    <h1>Choose your sandwich!</h1>
                    <Carddeck>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={elclassico}/>
                            <Card.Body>
                                <Card.Title>El Classico</Card.Title>
                                <Card.Text>
                                    Back to basics
                                </Card.Text>
                                <Button onClick={() => this.handleSubmit(1, 'El Classico')}>Order Now!</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={eleggo}/>
                            <Card.Body>
                                <Card.Title>El Eggo</Card.Title>
                                <Card.Text>
                                    Back to egg
                                </Card.Text>
                                <Button onClick={() => this.handleSubmit(2, 'El Eggo')}>Order Now!</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={elsuperior}/>
                            <Card.Body>
                                <Card.Title>El Superior</Card.Title>
                                <Card.Text>
                                    Back to superior
                                </Card.Text>
                                <Button onClick={() => this.handleSubmit(3, 'El Superior')}>Order Now!</Button>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={elvegano}/>
                            <Card.Body>
                                <Card.Title>El Vegano</Card.Title>
                                <Card.Text>
                                    Back to vegan
                                </Card.Text>
                                <Button onClick={() => this.handleSubmit(4, 'El Vegano')}>Order Now!</Button>
                            </Card.Body>
                        </Card>
                    </Carddeck>
                </Jumbotron>
            </Container>
        );
    }

}


// function SandwichSelection() {
//     return (
//         <Container className="p-3">
//             <Jumbotron>
//                 <h1>Choose your sandwich!</h1>
//                 <Carddeck>
//                     <Card style={{ width: '18rem' }}>
//                         <Card.Img variant="top" src={elclassico}/>
//                         <Card.Body>
//                             <Card.Title>El Classico</Card.Title>
//                             <Card.Text>
//                                 Back to basics
//                             </Card.Text>
//                             <Button href="http://localhost:12345/v1/order/1">Order Now!</Button>
//                         </Card.Body>
//                     </Card>
//                     <Card style={{ width: '18rem' }}>
//                         <Card.Img variant="top" src={eleggo}/>
//                         <Card.Body>
//                             <Card.Title>El Eggo</Card.Title>
//                             <Card.Text>
//                                 Back to egg
//                             </Card.Text>
//                             <Button>Order Now!</Button>
//                         </Card.Body>
//                     </Card>
//                     <Card style={{ width: '18rem' }}>
//                         <Card.Img variant="top" src={elsuperior}/>
//                         <Card.Body>
//                             <Card.Title>El Superior</Card.Title>
//                             <Card.Text>
//                                 Back to superior
//                             </Card.Text>
//                             <Button>Order Now!</Button>
//                         </Card.Body>
//                     </Card>
//                     <Card style={{ width: '18rem' }}>
//                         <Card.Img variant="top" src={elvegano}/>
//                         <Card.Body>
//                             <Card.Title>El Vegano</Card.Title>
//                             <Card.Text>
//                                 Back to vegan
//                             </Card.Text>
//                             <Button>Order Now!</Button>
//                         </Card.Body>
//                     </Card>
//                 </Carddeck>
//             </Jumbotron>
//         </Container>
//     );
// }

export default SandwichSelection;