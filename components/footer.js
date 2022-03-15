import { position } from "dom-helpers"
import Link from 'next/link'
import { Image } from "react-bootstrap"

export default function Footer() {
    return (
        <>

            <br />
            <footer className="footer mt-auto py-3 bg-light">
                <div className="container">
                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">


                        <div className="col-md-4 d-flex align-items-center">
                            <Link href="/" passHref>
                                <a className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                                    <svg className="bi" width="30" height="24"><use xlinkhref="#bootstrap"></use></svg>
                                </a>
                            </Link>
                            <span className="text-muted">© 2021 Oleksandr Stehura</span>
                        </div>

                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">

                            <Link href="https://github.com/Ostehura" passHref>
                                <a className="text-muted" >
                                    <Image alt="Github" src="github.svg" width={50} height={50} />

                                </a>
                            </Link>

                            {/* <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
                        <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li> */}
                        </ul>
                    </footer>
                </div>
            </footer>

        </>
    )
}