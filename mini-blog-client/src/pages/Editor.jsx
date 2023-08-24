import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Label, TextInput, Select, Button } from "flowbite-react";
import { createArticle, updateArticle } from "../redux/reducers/articleReducer";
import { getCategories } from "../redux/reducers/categoryReducer";
import "react-quill/dist/quill.snow.css";
import "./Editor.scss";

const initialState = {
  title: "",
  content: "",
  categoryId: 1,
  published: false,
};

function Editor() {
  const [articleData, setArticleData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { error, userArticles } = useSelector((state) => ({
    ...state.article,
  }));
  const { categoryList } = useSelector((state) => ({
    ...state.category,
  }));
  const { title, content, categoryId, published } = articleData;

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id) {
      const thisArticle = userArticles.find((article) => article.id === id);
      const articlePayLoad = {
        title: thisArticle.title,
        content: thisArticle.content,
        categoryId: thisArticle.categoryId,
        published: thisArticle.published,
      };
      setArticleData({ ...articlePayLoad });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content && categoryId) {
      const updatedArticleData = { ...articleData, name: user?.result?.name };

      if (!id) {
        dispatch(createArticle({ updatedArticleData, navigate, toast }));
      } else {
        dispatch(updateArticle({ id, updatedArticleData, toast, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { id } = e.target;
    let { value } = e.target;

    if (id === "published") {
      value = JSON.parse(value);
    }
    if (id === "categoryId") {
      value = parseInt(value);
    }
    setArticleData({ ...articleData, [id]: value });
  };

  const handleClear = () => {
    setArticleData({
      title: "",
      content: "",
      categoryId: 1,
      published: false,
    });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {id ? "Update Article" : "New Article"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <Label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="large"
                value="Title"
              />

              <TextInput
                id="title"
                value={title}
                onChange={onInputChange}
                type="text"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="large"
                value="Content"
              />
              <textarea
                id="content"
                rows="8"
                value={content}
                onChange={onInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="categoryId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                value="Category"
              />
              <Select
                id="categoryId"
                onChange={onInputChange}
                value={categoryId}
                required
              >
                {categoryList?.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label
                htmlFor="published"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                value="Status"
              />
              <Select
                id="published"
                onChange={onInputChange}
                value={published}
                required
              >
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              className="max-w-xs mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Editor;
