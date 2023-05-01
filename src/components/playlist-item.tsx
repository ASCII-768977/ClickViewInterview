import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import { PlaylistItemProps } from '../interfaces/playlist';

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, deletePlaylist } = props;

  const navigate = useNavigate();

  const videoCount =
    playlist.videoIds.length === 1
      ? '1 video'
      : `${playlist.videoIds.length} videos`;

  const handleOnClick = () => {
    navigate(`${playlist.id}`);
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    deletePlaylist(playlist.id);
  };

  return (
    <Row className="border rounded p-2 mb-2" onClick={handleOnClick}>
      <Col xs="12" md="3">
        <h2 className="h5">{playlist.name}</h2>
        <p className="mb-0">{videoCount}</p>
      </Col>
      <Col xs="12" md="9">
        <p className="mb-0">{playlist.description}</p>
      </Col>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </Row>
  );
}
