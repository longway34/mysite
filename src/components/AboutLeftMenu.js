import React from 'react';
import { Card, ListGroup, ListGroupItem, Nav, NavItem, NavLink } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

function AboutLeftMenu(props) {
    return (
        <din>
            <Card>
                <Card.Header>Проекты</Card.Header>
                <Card.Body>
                    <Nav className="flex-column" variant="pills" activeKey={props.location.pathname}>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/poster' as={Link} to='/projects/poster'>Poster</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/kkz' as={Link} to='/projects/kkz'>Металлодитектор</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/separator' as={Link} to='/projects/separator'>Сепаратор</NavLink></NavItem>
                    </Nav>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Исходники проектов</Card.Header>
                <Card.Body>
                    <Nav className="flex-column" variant="pills" activeKey={props.location.pathname}>
                        <NavItem><NavLink className='App-left-menu' eventKey='/sources/nodejs' as={Link} to='/sources/nodejs'>NodeJS</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/sources/cpp' as={Link} to='/sources/cpp'>C++</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/sources/qt' as={Link} to='/sources/qt'>Qt</NavLink></NavItem>
                    </Nav>
                </Card.Body>
            </Card>
        </din>
    );
}

export default withRouter(AboutLeftMenu);