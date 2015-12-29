import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={3}>
                        Test
                    </Col>
                    <Col xs={12} md={9}>
                        Test
                    </Col>
                </Row>
            </Grid>
        );
    }
}