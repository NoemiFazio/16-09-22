import styles from "./index.module.scss";
import React from "react";
import { useLoaderData, Await, useSearchParams } from "react-router-dom";
import CategoryList from "../../Components/CategoryList";
import { Suspense } from "react";

function HomePage() {
  const { categories } = useLoaderData();
  const [search, setSearch] = useSearchParams();

  const page = search?.get("page") ?? 1;
  const perPage = 4;
  const paginated = React.useMemo(() => {
    return categories?.slice((page - 1) * perPage, page * perPage);
  }, [page, categories]);

  const handlePageChange = (variation) => {
    setSearch((prev) => {
      return { page: Number(prev.get("page")) + variation };
    });
  };

  return (
    <div className={styles.homePage}>
      <Suspense fallback={<div style={{ color: "red" }}>Loading...</div>}>
        <Await
          resolve={categories}
          errorElement={<div>Could not load reviews 😬</div>}
        >
          {() => <CategoryList categories={paginated} />}
        </Await>
      </Suspense>
      <div className={styles.btnDiv}>
        <button onClick={handlePageChange.bind(this, -1)} disabled={page == 1}>
          Prev
        </button>
        <button onClick={handlePageChange.bind(this, +1)} disabled={page == 4}>
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;
