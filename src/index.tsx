import { hydrate, prerender as ssr } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [images, setImages] = useState([]); // State to hold the list of image names
  useEffect(() => {
    // Fetch the list of image names from the API
    fetch("https://api.ib.com/keylets")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching image names:", error));
  }, []);

  const filteredImages = images.filter((image) =>
    image.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col md={4} className="d-flex flex-column">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ListGroup className="flex-grow-1 overflow-auto">
            {filteredImages.map((image) => (
              <ListGroup.Item
                key={image}
                onClick={() => setSelectedImage(image)}
              >
                {image}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col
          md={8}
          className="d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#add8e6" }}
        >
          {selectedImage ? <h1>{selectedImage}</h1> : <h1>Image Preview</h1>}
        </Col>
      </Row>
    </Container>
  );
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
