const ImageCard = ({ image, children }) => {
  return (
    <figure className="w-[250px] overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-blue-300 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
      <img
        className="w-full h-[200px] object-cover rounded-t-xl transition-transform duration-300 ease-in-out hover:scale-110"
        src={image}
        alt="product"
      />
      <figcaption className="p-4 border-t-2 border-gray-200 dark:border-blue-500 text-gray-800 dark:text-gray-200 text-center">
        {children}
      </figcaption>
    </figure>
  );
};

export default ImageCard;
