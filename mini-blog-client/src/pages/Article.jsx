import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getArticle } from "../redux/reducers/articleReducer";
import moment from "moment";
// import { connect } from "react-redux";

function Article() {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => ({ ...state.article }));
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getArticle(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="pt-8 mt-24 break-allfile:mt-24 bg-white pb-16 lg:pt-16 lg:pb-24 flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-3 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src={article?.user?.image_url}
                  alt={article?.user?.name}
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {article?.user?.name}
                  </a>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400"></p>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    <time dateTime="2023-08-19" title="August 19th, 2023">
                      {moment(new Date(article?.publishedAt)).format("lll")}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {article.title}
            </h1>
          </header>
          <p> {article.content} </p>
        </article>
      </div>
      <div className="flex bg-white  items-center justify-end">
        <Link
          to="/"
          className="text-white mr-5 mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-6 h-6 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </Link>
      </div>
    </>
  );
}
export default Article;
