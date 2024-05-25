import { hydrate, prerender as ssr } from 'preact-iso';
import { useState } from 'preact/hooks';
import { Container, Row, Col, Form, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const images = ['Eliza', 'Elizabeth', 'Elizabelle']; // Placeholder image names

	const filteredImages = images.filter(image =>
		image.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Container>
			<Row>
				<Col md={4}>
					<Form.Control
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<ListGroup>
						{filteredImages.map(image => (
							<ListGroup.Item key={image} onClick={() => setSelectedImage(image)}>
								{image}
							</ListGroup.Item>
						))}
					</ListGroup>
				</Col>
				<Col md={8} className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#add8e6', minHeight: '400px' }}>
					{selectedImage ? <h1>{selectedImage}</h1> : <h1>Image Preview</h1>}
				</Col>
			</Row>
		</Container>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
