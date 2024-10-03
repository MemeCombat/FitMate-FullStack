export default function ImageCard({ imageUrl, children }) {
  return (
    <figure className="w-[250px] overflow-hidden rounded-base border-2 border-border dark:border-darkBorder bg-main font-base shadow-light dark:shadow-dark">
      <img className="w-full" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-text border-border dark:border-darkBorder p-4">
        {children}
      </figcaption>
    </figure>
  );
}
