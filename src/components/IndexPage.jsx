import React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

var file = require('../md/index.md');

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(file);
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={3}>
                        Test
                    </Col>
                    <Col xs={12} md={9}>
                        <div dangerouslySetInnerHTML={{__html: file}}>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}