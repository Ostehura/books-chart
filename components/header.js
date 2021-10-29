import { Navbar, Container, Nav } from 'react-bootstrap'
import Link from 'next/link'

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Book chart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref ><Nav.Link > Home</Nav.Link></Link>
            <Link href="/about-us" passHref><Nav.Link > About project</Nav.Link></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}