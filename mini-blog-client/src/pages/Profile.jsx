import { useEffect } from "react";
import { Table } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteArticle,
  getUserArticles,
} from "../redux/reducers/articleReducer";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userArticles } = useSelector((state) => ({
    ...state.article,
  }));
  const userId = user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserArticles(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // const excerpt = (str) => {
  //   if (str.length > 20) {
  //     str = str.substring(0, 20) + " ...";
  //   }
  //   return str;
  // };

  //   if (loading) {
  //     return <Spinner />;
  //   }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article ?")) {
      dispatch(deleteArticle({ id, toast }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4 pb-5 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex justify-between container mx-auto">
        <div className="max-mx-8 w-4/12 hidden lg:block">
          <div className="mt-10 px-8">
            <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
              <div className="w-full max-w-sm bg-white rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10">
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={user?.image_url}
                    alt="Bonnie image"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-10 lg:w-8/12">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:text-neutral-800">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          Article name
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Status
                        </th>
                        <th scope="col" className=" px-6 py-4" />
                      </tr>
                    </thead>

                    <tbody>
                      {userArticles.map((article) => (
                        <tr
                          key={article.id}
                          className="border-b dark:border-neutral-500 bg-white"
                        >
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {article.title}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {" "}
                            {!article?.published ? (
                              <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                Draft
                              </span>
                            ) : (
                              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                Published
                              </span>
                            )}
                          </td>
                          <td className="flex justify-end px-6 py-4">
                            <Link
                              to={`/articles/${article.id}/edit`}
                              className="font-medium text-right pr-3 text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                              <p>Edit</p>
                            </Link>
                            <a
                              href="#"
                              onClick={() => handleDelete(article.id)}
                              className="font-medium text-right text-red-600 hover:underline dark:text-red-600"
                            >
                              <p>Delete</p>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
