import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Route, withRouter } from 'react-router';
import AboutPageContainer from '../containers/AboutPageContainer';

import AboutLeftMenu from './AboutLeftMenu';

function Middle(props) {
    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <AboutLeftMenu />
                </Col>
                <Col xs={9}>

                    <div className="d-flex flex-column">
                        <Switch>
                            <Route exact path="/about" component={AboutPageContainer} />

                            <Route exact path="/projects/poster"  render={()=>
                                <div className='App-content'>Здесь нечто при ссылке pojects/poster</div>} />
                            <Route exact path="/projects/kkz"  render={()=>
                                <div className='App-content'>Здесь нечто при ссылке projects/kkz</div>} />
                            <Route exact path="/projects/separator"  render={()=>
                                <div className='App-content'>Здесь нечто при ссылке projects/separator</div>} />
                            <Route exact path="/sources/nodejs"  render={()=>
                                <div className='App-content'>Здесь нечто при ссылке sources/nodejs</div>} />
                            <Route exact path="/sources/cpp"  render={()=>
                                <div className='App-content'>Здесь нечто при ссылке sources/cpp</div>} />
                            <Route exact path="/sources/qt"  render={()=>
                                <div className='App-content'>Здесь нечто при ссылке sources/qt</div>} />
                        </Switch>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(Middle);