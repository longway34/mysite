/**
 * Левая навигационная панель
 * @module MainLeftMenu
 */
import React from 'react';
import { Card, Nav, NavItem, NavLink } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

/**
 * Представляет <HelpPageComponent \/> React компонент, для отображения левой панели навигации
 * @param {Object} props 
 * @prop {Object} props.location
 * @prop {String} props.location.pathname - свойство React-router, представляющий текущую страницу
 */
function MainLeftMenu(props) {
    return (
        <div>
            <Card>
                <Card.Header>Проекты</Card.Header>
                <Card.Body>
                    <Nav className="flex-column" variant="pills" activeKey={props.location.pathname}>
                        <NavItem><NavLink className='App-left-menu' eventKey='/about' as={Link} to='/about'>Этот веселый сайт</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/poster_s' as={Link} to='/projects/poster_s'>Poster (сервер)</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/poster_c' as={Link} to='/projects/poster_c'>Poster (клиент)</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/kkz_md' as={Link} to='/projects/kkz_md'>Металлодитектор (управление)</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/kkz_web' as={Link} to='/projects/kkz_web'>Металлодитектор (http сервер)</NavLink></NavItem>
                        <NavItem><NavLink className='App-left-menu' eventKey='/projects/kkz_ui' as={Link} to='/projects/kkz_ui'>Металлодитектор (клиент)</NavLink></NavItem>
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
                        <NavItem><NavLink className='App-left-menu' eventKey='/sources/js' as={Link} to='/sources/js'>JavaScript</NavLink></NavItem>
                    </Nav>
                </Card.Body>
            </Card>
        </div>
    );
}

export default withRouter(MainLeftMenu);