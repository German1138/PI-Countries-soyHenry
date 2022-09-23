import React from "react";

import s from "./Pagination.module.css";

export default function Pagination({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className={s.container}>
      {pages.map((page, index) => {
        return (
          <button
            className={s.btns}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
