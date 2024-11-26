interface PlaceProps {
  item: {
    id: string;
    image: string;
    title: string;
    description: string;
  };
}

const Place = ({ item }: PlaceProps) => {
  return (
    <article className="place">
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </article>
  );
};

export default Place;
