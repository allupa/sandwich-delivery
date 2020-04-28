import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: null,
            orderStatus: '',
            orderProgress: null,
            progressVariant: 'info'
        };
    }

    handleSubmit = async () => {
        var orderId = document.getElementById('formOrderStatus').value;
        const response = await fetch(`http://localhost:12345/v1/order/${orderId}`,{
            method: 'GET'
        });
        const body = await response.json();
        var progress = 0;
        var pVariant = 'info';
        console.log("BODY", body);
        if(body[0].status == "ready"){
            progress = 100;
            pVariant = 'success';
        } else if (body[0].status == "ordered"){
            progress = 50;
            pVariant = 'warning';
        }
        this.setState({
            orderId: body[0].id,
            orderStatus: body[0].status,
            orderProgress: progress,
            progressVariant: pVariant
        })
        if(response.status !== 200) throw Error(body.message);
        return body;
    };

    render(){
        return (
            <Container className="justify-content-md-center">
                <Form>
                    <Form.Group controlId="formOrderStatus">
                        <Form.Label>Track your order</Form.Label>
                        <Form.Control type="text" placeholder="Order ID"/>
                        <Form.Text className="text-muted">
                            Paste the Order ID given to you here.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            <Table>
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Status</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.state.orderId}</td>
                        <td>{this.state.orderStatus}</td>
                        <td>
                            <ProgressBar striped variant={this.state.progressVariant} now={this.state.orderProgress}/>
                        </td>
                    </tr>
                </tbody>
            </Table>
            </Container>
        )
    };
}

export default StatusBar;