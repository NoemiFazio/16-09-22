import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./index.module.scss";

const CategoryListItem = (props) => {
  const { category } = props;
  const [isImgLoaded, setImgLoaded] = useState(false);

  return (
    <li className={styles.CategoryListItem}>
      <div className={styles.wrapper}>
        <img
          className={`${styles.thumbnail} ${
            !isImgLoaded ? styles.loading : ""
          }`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{ opacity: isImgLoaded ? "1" : ".5" }}
          src={category.strCategoryThumb}
          alt={`preview of ${category.strCategory} category`}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{category.strCategory}</h3>
      </div>
      <Link
        to={`/catalogo/${category.strCategory}`}
        title={`naviga sul catalogo ${category.strCategory}`}
        className={styles.link}
      >
        {category.strCategory}
      </Link>
    </li>
  );
};

export default CategoryListItem;
