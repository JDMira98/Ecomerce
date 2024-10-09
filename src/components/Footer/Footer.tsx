import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTimes,
} from "react-icons/fa"; // Importa iconos de react-icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5>Contáctanos</h5>
            <p>
              Teléfono:{" "}
              <a href="tel:+1234567890" className="text-white">
                +57 319 6439570
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:JuanDiego.MiraMoreno@gmail.com"
                className="text-white"
              >
                JuanDiego.MiraMoreno@gmail.com
              </a>
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <h5>Síguenos en</h5>
            <div className="d-flex justify-content-center justify-content-md-end">
              <a
                href="https://www.facebook.com"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://x.com/"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTimes size={24} />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        <small>
          &copy; {new Date().getFullYear()} Harmony. Todos los derechos
          reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
