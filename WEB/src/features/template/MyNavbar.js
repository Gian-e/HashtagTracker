import { Navbar, Container, Nav } from 'react-bootstrap';

export function MyNavbar() {
    return (
        <Navbar expand="lg" style={{marginBottom:'30px'}}>
            <Container>
                <Navbar.Brand href="/">Painel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="approver">Aprovador</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}