import { Col, Row, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import { PlaylistItemProps } from '../interfaces/playlist';

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, deletePlaylist } = props;
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    deletePlaylist(playlist.id);
    setShowModal(false);
  };

  return (
    <>
      <Row
        className="border rounded p-2 mb-4"
        onClick={handleOnClick}
        style={{ cursor: 'pointer' }}
      >
        <Col xs="12" md="3">
          <h2 className="h5">{playlist.name}</h2>
          <p className="mb-0">{videoCount}</p>
        </Col>
        <Col xs="12" md="9">
          <p className="mb-0">{playlist.description}</p>
        </Col>
        <button
          type="button"
          onClick={handleDelete}
          className="btn-basic btn-bd-primary"
        >
          Delete
        </button>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this playlist?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
