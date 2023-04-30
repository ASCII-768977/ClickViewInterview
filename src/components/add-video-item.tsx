import { Image } from 'react-bootstrap';
import { PropsType } from '../interfaces/props';

export const AddVideoItem = ({ thumbnail, name, onClick }: PropsType) => {
  return (
    <div style={{ width: 100, cursor: 'pointer' }} onClick={onClick}>
      <Image
        fluid
        rounded
        src={`${thumbnail}?size=small`}
        alt={name}
        className="w-100"
      />
      <p>{name}</p>
    </div>
  );
};
