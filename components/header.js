import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Book chart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link > <Link href="/" >Home</Link></Nav.Link>
            <Nav.Link > <Link href="/about-us">About project</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}