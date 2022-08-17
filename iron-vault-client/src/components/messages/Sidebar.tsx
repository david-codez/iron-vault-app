import React, { useState, useEffect } from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'


const CHATS_KEY = 'chats'
const CONTACTS_KEY = 'contacts'

export default function Sidebar() {

    const [activeKey, setActiveKey] = useState(CHATS_KEY)

    return(
        <div className='messages-div'>
            <Tab.Container id='sidebar-container' defaultActiveKey='first'>
                <Row>
                    <Col sm={3}>
                        <Row>
                            <Nav variant='pills' className='justify-content-center'>
                                <Col md={3}>
                                    <Nav.Item>
                                        <Nav.Link>Chats</Nav.Link>
                                    </Nav.Item>
                                </Col>
                                <Col md={3}>
                                    <Nav.Item>
                                        <Nav.Link>Contacts</Nav.Link>
                                    </Nav.Item>
                                </Col>
                            </Nav>
                        </Row>
                        <Nav variant='pills' className='flex-column'>
                            <Nav.Item>
                                <Nav.Link eventKey={CHATS_KEY}>Tab 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey={CONTACTS_KEY}>Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <div className='content-div'>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey={CHATS_KEY}>
                                <h1>This is tab one</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey={CONTACTS_KEY}>
                                <h1>This is tab two</h1>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                    </div>

                </Row>
            </Tab.Container>
        </div>


    )
}