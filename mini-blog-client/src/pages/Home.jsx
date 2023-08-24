import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles, setCurrentPage } from "../redux/reducers/articleReducer";
import { getPopularCategories } from "../redux/reducers/categoryReducer";
import ArticleCard from "../components/Article/ArticleCard";
import Category from "../components/Category/Category";
import LoadmoreButton from "../components/Button/LoadmoreButton";

function Home() {
  const { articles, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.article,
    })
  );
  const { categories } = useSelector((state) => ({
    ...state.category,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles({ page: currentPage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPopularCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-20  px-4 pb-5 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex justify-between container mx-auto">
        <div className="w-full lg:w-8/12">
          {articles &&
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          <LoadmoreButton
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            dispatch={dispatch}
          />
        </div>

        <div className="max-mx-8 w-4/12 hidden lg:block">
          <div className="mt-10 px-8">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
            <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
              {categories &&
                categories.map((category) => (
                  <Category key={category.id} category={category} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
