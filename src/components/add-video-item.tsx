import { Image } from 'react-bootstrap';

type Props = {
  thumbnail: string;
  name: string;
  onClick: () => void;
};

export const AddVideoItem = ({ thumbnail, name, onClick }: Props) => {
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
