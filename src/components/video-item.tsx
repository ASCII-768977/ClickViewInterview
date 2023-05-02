import { Col, Image, Row } from 'react-bootstrap';
import { VideoItemProps } from '../interfaces/video';
import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export function VideoItem(props: VideoItemProps) {
  const { video, onClick, onCheckboxChange, onToggleChecked } = props;

  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`${video.id}`);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onCheckboxChange!(video.id, e.target.checked);
  };

  return (
    <>
      {onToggleChecked ? (
        <Row>
          <Col xs="12" md="1" style={{ marginTop: '2.5rem' }}>
            <div
              className="input-group-text"
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <input
                className="form-check-input mt-0"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isChecked}
                aria-label="checkbox"
              />
            </div>
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
        <Row onClick={handleOnClick}>
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
