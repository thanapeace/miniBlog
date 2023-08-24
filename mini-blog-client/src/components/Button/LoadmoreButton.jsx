import { Button } from "flowbite-react";

const LoadmoreButton = ({
  setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch,
}) => {
  const renderLoadmoreButton = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;
    if (currentPage !== numberOfPages) {
      return (
        <Button
          className="w-full mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          color="gray"
          outline
          size="md"
        >
          <p>Load more</p>
        </Button>
      );
    }
  };

  return <>{renderLoadmoreButton()}</>;
};

export default LoadmoreButton;
