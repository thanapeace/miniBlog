import moment from "moment";
import { Link } from "react-router-dom";

const excerpt = (str) => {
  if (str.length > 30) {
    str = str.substring(0, 30) + " ...";
  }
  return str;
};


function ArticleCard({ article }) {
  return (
    <div className="mt-6 break-all">
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            {article?.category?.name}
          </span>
          <span className="text-sm">
            {" "}
            {article?.publishedAt
              ? moment(new Date(article.publishedAt)).fromNow()
              : ""}
          </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {" "}
          <Link to={`/articles/${article.id}`}>{article.title}</Link>
        </h2>
        <p className="mb-5 truncate font-light text-gray-500 dark:text-gray-400">
          {article?.content}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="w-7 h-7 rounded-full"
              src={article?.user?.image_url}
              alt="Jese Leos avatar"
            />
            <div className="font-medium  dark:text-white">
            {article.title ? excerpt(article?.user?.name) : ""}
            </div>
          </div>
          <Link
            to={`/articles/${article.id}`}
            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
          >
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </article>
    </div>
  );
}

export default ArticleCard;
