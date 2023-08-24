function Categories({ category }) {
  return (
    <ul>
      <li>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
        >
          <span className="flex-1 ml-3 whitespace-nowrap">
            {category.name}
          </span>
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {category._count.article}
          </span>
        </div>
      </li>
    </ul>
  );
}

export default Categories;
