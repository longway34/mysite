import React from 'react';
import { Card, Col, Container, Figure, Image, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import SiteTitle from './SiteTitleLogo';

import logo from './mylogo.png';

/**
 * Создает навигационную панель в заголовке страниц
 * @param {*} props 
 */

const Header = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Navbar className='bg-light justify-content-between' style={{ backgroundColor: '#e3ffff' }}>
                        <Nav>
                            <Nav.Item>
                                <SiteTitle />
                            </Nav.Item>
                        </Nav>
                        {/* <Nav.Item> */}
                        {/* <SiteTitle /> */}
                        <Nav fill variant='tabs' defaultActiveKey='/about'>
                            <Nav.Item>
                                <Nav.Link eventKey='/about' to='/about' as={Link}>К чему все это...</Nav.Link>
                            </Nav.Item>
                            <NavDropdown title='Проекты'>
                                <NavDropdown.Item eventKey='/projects/poster_s' to='/projects/poster_s' as={Link}>Poster (сервер)</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/projects/poster_c' to='/projects/poster_c' as={Link}>Poster (клиент)</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/projects/kkz_md' to='/projects/kkz_md' as={Link}>Метеллодитектор (управление)</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/projects/kkz_web' to='/projects/kkz_web' as={Link}>Метеллодитектор (http сервер)</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/projects/kkz_ui' to='/projects/kkz_ui' as={Link}>Метеллодитектор (клиент)</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/projects/separator' to='/projects/separator' as={Link}>Сепаратор</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title='Исходники'>
                                <NavDropdown.Item eventKey='/sources/nodejs' to='/sources/nodejs' as={Link}>NodeJS</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/sources/cpp' to='/sources/cpp' as={Link}>C++</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/sources/qt' to='/sources/qt' as={Link}>Qt</NavDropdown.Item>
                                <NavDropdown.Item eventKey='/sources/js' to='/sources/js' as={Link}>JavaScript</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {/* </Nav.Item> */}
                        {/* <Nav.Item> */}

                        {/* </Nav.Item> */}
                        {/* </Nav> */}
                    </Navbar>
                </Col>
            </Row>
        </Container>);
};

export default withRouter(Header);