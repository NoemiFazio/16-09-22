// import CategoryListItem from "../CategoryListItem";
import React from "react";
import styles from "./index.module.scss";

export const LazyCategoryListItem = React.lazy(() =>
  import("../CategoryListItem/CategoryListItem.jsx")
);

const CategoryList = (props) => {
  const { categories = [] } = props;

  return (
    <section className={styles.CategoryList}>
      <ul>
        {categories.map((category) => (
          <React.Suspense fallback={"loading!"}>
            <LazyCategoryListItem
              key={category.idCategory}
              category={category}
            />
          </React.Suspense>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
