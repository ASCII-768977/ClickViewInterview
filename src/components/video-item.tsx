import { Col, Image, Row } from 'react-bootstrap';
import { Video } from '../interfaces/video';

interface VideoItemProps {
  video: Video;
  onClick?: () => void;
}

export function VideoItem(props: VideoItemProps) {
  const { video, onClick } = props;

  return (
    <Row>
      <Col xs="12" md="3" className="mb-3">
        <Image
          fluid
          rounded
          src={`${video.thumbnail}?size=small`}
          alt={video.name}
          className="w-100"
        />
      </Col>
      <Col xs="12" md="9" className="mb-3">
        <h2 className="h4">{video.name}</h2>
        <p>{video.description}</p>
        {onClick && <button onClick={onClick}>Delete</button>}
      </Col>
    </Row>
  );
}
