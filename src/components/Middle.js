/**
 * @module Middle
 */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Route, withRouter, Redirect } from 'react-router';
import AboutPageContainer from '../containers/AboutPageContainer';
import PosterPageContainer from '../containers/PosterPageContainer';
import SeparatorPageContainer from '../containers/SeparatorPageContainer';
import KKZPageContainer from '../containers/KKZPageContainer'
import CPPAnonseContainer from '../containers/CPPAnonseContainer'

import NodejsAnonseContainer from '../containers/NodejsAnonseContainer';

import MainLeftMenu from './MainLeftMenu';
import HelpPageContainer from '../containers/HelpPageContainer';

/**
 * Представляет <Middle \/> React компонент, для отображения левой панели навигации и основной контент страницы,
 * Получаемой при ресолве пути React-router 
 * @function
 */
function Middle() {
    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <MainLeftMenu />
                </Col>
                <Col xs={9}>

                    <div className="d-flex flex-column">
                        <Switch>
                            <Route exact path="/" render={
                                (props) => (<Redirect to='/about' {...props} />)
                                } />
                            <Route exact path="/about" component={AboutPageContainer} />
                            <Route exact path="/projects/poster_s" render={(props) => (<PosterPageContainer {...props} mode='server' />)} />
                            <Route exact path="/projects/poster_c" render={(props) => (<PosterPageContainer {...props} mode='client' />)} />
                            <Route exact path="/projects/kkz_md" render={(props) => (<KKZPageContainer {...props} mode='md' />)} />
                            <Route exact path="/projects/kkz_web" render={(props) => (<KKZPageContainer {...props} mode='web' />)} />
                            <Route exact path="/projects/kkz_ui" render={(props) => (<KKZPageContainer {...props} mode='ui' />)} />
                            <Route exact path="/projects/separator"  component={SeparatorPageContainer} />
                            <Route exact path="/sources/nodejs"  component={NodejsAnonseContainer} />

                            <Route exact path="/sources/cpp"  component={CPPAnonseContainer} />
                            <Route exact path="/sources/qt"  component={SeparatorPageContainer} />
                            <Route exact path="/sources/js"  render={(props) => (<KKZPageContainer {...props} mode='ui' />)} />
                            <Route exact path="/help" render={
                                (props) => (<Redirect to='/help/index.html' {...props} />)
                                } />
                            <Route exact path="/help/*" render={

                                (props) => (<HelpPageContainer {...props} url={props.match.url}/>)
                                } />
                        </Switch>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default withRouter(Middle);