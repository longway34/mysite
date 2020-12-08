import React from 'react';
import { Col, Row, Container, Image } from 'react-bootstrap';

import logo from './mylogo.png';
import smile from './smile-1.gif';

// padding-right: 0px;
//     padding-left: 0px;
//     margin-left: 0px;
//     margin-right: 0px;
//     align-content: flex-start;
//     display: contents;


const SiteTitleLogo = () => {
    return (
        <Container>
            <Row > 
                <Col xs={2}>
                    {/* <Image className='App-logo' src={logo} style={{width: '64pt', padding: '5pt'}}/>  */}
                    <Image className='App-logo' src={logo}/> 
                </Col >
                {/* <Col xs={10} style={{display: "flex", alignItems: 'center', fontSize: '24pt', fontWeight: 'bold', fontFamily: "Helvetika"}}> */}
                <Col xs={10} className='App-header-text-column'>
                Всем привет! Это я..., точнее мы...<Image src={smile} className='App-header-smile'/>
                </Col>
            </Row>
        </Container>
    );
};


export default SiteTitleLogo;