import { Col, Image, Row } from 'react-bootstrap';
import { VideoItemProps } from '../interfaces/video';
import { useState, ChangeEvent } from 'react';

export function VideoItem(props: VideoItemProps) {
  const { video, onClick, onCheckboxChange, onToggleChecked } = props;

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onCheckboxChange!(video.id, e.target.checked);
  };

  return (
    <>
      {onToggleChecked ? (
        <Row>
          <Col xs="12" md="1">
            <input
              aria-label="select added video"
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
          </Col>
          <Col xs="12" md="3" className="mb-3">
            <Image
              fluid
              rounded
              src={`${video.thumbnail}?size=small`}
              alt={video.name}
              className="w-100"
            />
          </Col>
          <Col xs="12" md="8" className="mb-3">
            <h2 className="h4">{video.name}</h2>
            <p>{video.description}</p>
            {onClick && (
              <button
                type="button"
                onClick={onClick}
                className="btn-basic btn-bd-primary"
              >
                Delete
              </button>
            )}
          </Col>
        </Row>
      ) : (
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
            {onClick && (
              <button
                type="button"
                onClick={onClick}
                className="btn-basic btn-bd-primary"
              >
                Delete
              </button>
            )}
          </Col>
        </Row>
      )}
    </>
  );
}
