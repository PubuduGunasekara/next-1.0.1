import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { newsListPublicMobileReviews } from "../../actions/news.action";
import { mobileListPublicNewsReviews } from "../../actions/mobile.action";
import { reviewListPublic } from "../../actions/review.action";
import moment from "moment";
import {
  API,
  DOMAIN,
  APP_NAME,
  FB_APP_ID,
  TWITTER_PUBLISHER_HANDLE,
  TWITTER_AUTHOR_HANDLE,
} from "../../config";
import { FaNewspaper } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import React from "react";
import styles from "../../styles/reviewFrontEnd.module.css";
import Loader from "react-loader-spinner";
/**
 * completed!
 */
const AllReviews = ({ reviews, news, mobiles }) => {
  const [searchValues, setSearchValues] = useState({
    search: "",
    showSearch: false,
    filteredContent: [],
  });

  const { search, showSearch, filteredContent } = searchValues;

  const head = () => (
    <Head>
      <title>Reviews - {APP_NAME}</title>
      <meta name="description" content={`Review articles - ${APP_NAME}`} />
      <link rel="canonical" href={`${DOMAIN}/reviews`} />
      {/* Twitter Card data  */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={`@${TWITTER_PUBLISHER_HANDLE}`} />
      <meta name="twitter:title" content={`Reviews - ${APP_NAME}`} />
      <meta
        name="twitter:description"
        content={`Review articles - ${APP_NAME} `}
      />
      <meta name="twitter:creator" content={`@${TWITTER_AUTHOR_HANDLE}`} />
      {/* Twitter Summary card images must be at least 120x120px */}
      <meta
        name="twitter:image"
        content={`${DOMAIN}/static/images/resize-reviewcover.jpg`}
      />
      <meta name="twitter:image:alt" content={`${DOMAIN}`} />

      {/* Open Graph data  */}
      <meta property="og:title" content={`Review - ${APP_NAME}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/reviews`} />
      <meta
        alt={`${DOMAIN}`}
        property="og:image"
        content={`${DOMAIN}/static/images/resize-og-reviewcover.jpg`}
      />
      <meta
        property="og:description"
        content={`Review articles - ${APP_NAME} `}
      />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  /**done */
  const showSideBarNews = () => {
    return news.map((blog, i) => (
      <React.Fragment key={i}>
        <div key={i} className={styles.sidebar_news_container}>
          <div className={styles.image_news}>
            <Link href={`/news/${blog.slug}`}>
              <a style={{ textDecoration: "none", width: "100%" }}>
                <img
                  className="img img-fluid"
                  src={`${API}/news/photo/${blog.slug}`}
                  alt={blog.title}
                />
              </a>
            </Link>
          </div>
          <div
            className={styles.content_news}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className={styles.content_div_news}>
              <Link href={`/news/${blog.slug}`}>
                <a style={{ textDecoration: "none", width: "100%" }}>
                  <span>{blog.title}</span>
                </a>
              </Link>
            </div>

            <div className={styles.author_div_news}>
              <time>
                {moment(blog.updatedAt).fromNow()} | by {blog.postedBy.username}
              </time>
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
  };

  /**done */
  const showSideBarMobiles = () => {
    return mobiles.map((m, i) => (
      <React.Fragment key={i}>
        <div
          title="latest mobile phone specifications"
          className={styles.single__card__phone}
        >
          <div className={styles.card__image__container__phone}>
            <Link href={`/phones/brand/${m.slug}`}>
              <a>
                <img src={`${API}/mobile/photo/${m.slug}`} alt={`${m.title}`} />
              </a>
            </Link>
          </div>
          <div className={styles.card__content__phone}>
            <Link href={`/phones/brand/${m.slug}`}>
              <a>
                <span>{m.title}</span>
              </a>
            </Link>
          </div>
        </div>
      </React.Fragment>
    ));
  };

  /**reviews pagination states */
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);
  //const [numOfPost, setNumberOfPost] = useState(0);

  //pagination
  const indexofLastPost = currentPage * postPerPage;
  const indexofFirstPost = indexofLastPost - postPerPage;
  const currentPost = reviews.slice(indexofFirstPost, indexofLastPost);
  const lastPage = reviews.length / postPerPage;

  //change the page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const Pagination = (
    postsPerPage,
    totalPosts,
    paginate,
    nextPage,
    previousPage,
    curretPageForStyle,
    lastPage
  ) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul className="pagination justify-content-center flex-wrap">
          <li
            className={
              "page-item" + (curretPageForStyle === 1 ? " disabled" : "")
            }
          >
            <a className="page-link" onClick={() => previousPage()} href="#">
              PREV
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={
                curretPageForStyle === number ? "active" : "" + " page-item"
              }
            >
              <a
                onClick={() => paginate(number)}
                href="#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
          <li
            className={
              "page-item" + (curretPageForStyle < lastPage ? "" : " disabled")
            }
          >
            <a className="page-link" onClick={() => nextPage()} href="#">
              NEXT
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  /**done */
  const showReviews = () => {
    return currentPost.map((m, i) => (
      <React.Fragment key={i}>
        <div className={styles.single__card}>
          <div className={styles.card__image__container}>
            <Link href={`/reviews/${m.slug}`}>
              <a>
                <div className={styles.overlay}></div>
                <img
                  src={`${API}/reviews/photo/${m.slug}`}
                  alt={`${m.title}`}
                />
              </a>
            </Link>
          </div>
          <div className={styles.card__content}>
            <Link href={`/reviews/${m.slug}`}>
              <a>
                <div className={styles.review_title}>
                  <h2>{m.title}</h2>
                </div>
                <div className={styles.author}>
                  <span>
                    By {m.postedBy.username} | {moment(m.updatedAt).fromNow()}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </React.Fragment>
    ));
  };

  const handleChange = (e) => {
    setSearchValues({
      ...searchValues,
      search: e.target.value,
      showSearch: false,
      filteredContent: [],
    });
  };

  const seacrhSubmit = (e) => {
    e.preventDefault();

    setSearchValues({
      ...searchValues,
      showSearch: true,
      filteredContent: reviews.filter((data) => {
        return (
          data.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !=
          -1
        );
      }),
    });
  };

  /**reviewSearch pagination states */
  const [currentPageSearched, setCurrentPageSearched] = useState(1);
  const [postPerPageSearched] = useState(20);

  //pagination
  const indexofLastPostSearched = currentPageSearched * postPerPageSearched;
  const indexofFirstPostSearched =
    indexofLastPostSearched - postPerPageSearched;
  const currentPostSearched = filteredContent.slice(
    indexofFirstPostSearched,
    indexofLastPostSearched
  );
  const lastPageSearched = filteredContent.length / postPerPageSearched;

  //change the page
  const paginateSearched = (pageNumberSearched) => {
    setCurrentPageSearched(pageNumberSearched);
  };
  const nextPageSearched = () => {
    setCurrentPageSearched(currentPageSearched + 1);
  };
  const previousPageSearched = () => {
    setCurrentPageSearched(currentPageSearched - 1);
  };

  /**done */
  const showSearchedReviews = (currentPostSearched) => {
    return currentPostSearched.map((m, i) => (
      <React.Fragment key={i}>
        <div className={styles.single__card}>
          <div className={styles.card__image__container}>
            <Link href={`/reviews/${m.slug}`}>
              <a>
                <div className={styles.overlay}></div>
                <img
                  src={`${API}/reviews/photo/${m.slug}`}
                  alt={`${m.title}`}
                />
              </a>
            </Link>
          </div>
          <div className={styles.card__content}>
            <Link href={`/reviews/${m.slug}`}>
              <a>
                <div className={styles.review_title}>
                  <h2>{m.title}</h2>
                </div>
                <div className={styles.author}>
                  <span>
                    By {m.postedBy.username} | {moment(m.updatedAt).fromNow()}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </React.Fragment>
    ));
  };

  return (
    <React.Fragment>
      {reviews && news && mobiles ? (
        <React.Fragment>
          {head()}
          <div
            alt="Photo by Glenn Carstens-Peters on Unsplash"
            style={{
              backgroundImage: `url(/static/images/review_cover.jpg)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
              backgroundSize: "cover",
              height: "300px",
              width: "100%",
              boxShadow: "0px 0px 0px rgba(0,0,0,0.9)",
            }}
          >
            <div
              className="container"
              style={{ paddingTop: "50px", paddingBottom: "50px" }}
            >
              <div
                style={{
                  height: "120px",
                  overflowY: "auto",
                  color: "#EEE1E1",
                  paddingBottom: 0,
                  paddingTop: 0,
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                <h1
                  title="Gear Reviews"
                  className={styles.cover__image__div__main__topic}
                >
                  Reviews
                </h1>
              </div>
              <div style={{ overflow: "auto" }}>
                <form
                  onSubmit={seacrhSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "40px",
                  }}
                >
                  <input
                    title={`search for Reviews`}
                    className="form-control"
                    onChange={handleChange}
                    value={search}
                    required
                    style={{
                      width: "77%",
                      opacity: ".7",
                      borderRadius: "0px",
                      borderColor: "white",
                      height: "40px",
                    }}
                    type="search"
                    placeholder="Search Here"
                  />
                  <button
                    type="submit"
                    className="btn btn-dark"
                    style={{
                      border: "1px solid white",
                      backgroundColor: "#2c2c2c",
                      opacity: "0.9",
                      height: "40px",
                      borderRadius: "0px",
                      width: "23%",
                    }}
                  >
                    Search
                  </button>
                </form>
              </div>
              <div>
                {filteredContent.length > 0 ? (
                  <div>
                    <span
                      style={{
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "700",
                        textTransform: "capitalize",
                      }}
                    >
                      {filteredContent.length} result(s) found!
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="container mt-3 mb-5 pl-0 pr-0">
            <div className="row ml-0 mr-0">
              <div style={{ width: "100%" }}>
                <nav aria-label="breadcrumb">
                  <ol
                    style={{ backgroundColor: "#f3f3f3" }}
                    className="breadcrumb pt-0 pb-0"
                  >
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <a>Home</a>
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Reviews
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-md-12">
                    {showSearch ? (
                      <React.Fragment>
                        {filteredContent.length !== 0 ? (
                          <div
                            className="row"
                            style={{
                              backgroundColor: "white",
                              boxShadow: "0px 0px 1px rgba(0,0,0,0.5)",
                            }}
                          >
                            <div
                              className="col-md-12"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                marginTop: "20px",
                                marginBottom: "10px",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  paddingTop: 0,
                                }}
                              >
                                <hr
                                  style={{ marginTop: "6px" }}
                                  className={styles.hrText}
                                  data-content={`${filteredContent.length} result(s) found!`}
                                />
                              </div>
                            </div>
                            <div
                              className={`${styles.cards} ${styles.box__sizing}`}
                            >
                              {showSearchedReviews(currentPostSearched)}
                            </div>
                            <div style={{ width: "100%" }}>
                              {Pagination(
                                postPerPageSearched,
                                filteredContent.length,
                                paginateSearched,
                                nextPageSearched,
                                previousPageSearched,
                                currentPageSearched,
                                lastPageSearched
                              )}
                            </div>
                          </div>
                        ) : (
                          <div
                            className="row"
                            style={{
                              backgroundColor: "white",
                              boxShadow: "0px 0px 1px rgba(0,0,0,0.5)",
                            }}
                          >
                            <div
                              style={{
                                margin: "20px",
                                padding: "20px",
                                textAlign: "center",
                                width: "100%",
                                height: "100%",
                              }}
                              className={`alert alert-danger ${styles.change__no__results__found__styles}`}
                              role="alert"
                            >
                              <h2
                                style={{
                                  margin: "20px",
                                  padding: "20px",
                                  textAlign: "center",
                                  color: "#383838",
                                }}
                              >
                                No Results found.
                              </h2>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ) : (
                      <div
                        className="row"
                        style={{
                          backgroundColor: "white",
                          boxShadow: "0px 0px 1px rgba(0,0,0,0.5)",
                        }}
                      >
                        <div
                          className={`${styles.cards} ${styles.box__sizing}`}
                        >
                          {showReviews()}
                        </div>
                        <div style={{ width: "100%" }}>
                          {Pagination(
                            postPerPage,
                            reviews.length,
                            paginate,
                            nextPage,
                            previousPage,
                            currentPage,
                            lastPage
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`col-lg-4 ${styles.side__bar__single__brand__main}`}
              >
                {mobiles.length !== 0 ? (
                  <div
                    className={`row mr-0 ${styles.side__bar__single__brand}`}
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0px 0px 1px rgba(0,0,0,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      className="col-md-12"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        marginTop: "20px",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "5px" }}>
                        <FiSmartphone size="1rem" color="#505050" />
                      </div>
                      <div style={{ width: "100%", paddingTop: 0 }}>
                        <hr
                          style={{ marginTop: "6px" }}
                          className={styles.hrText}
                          data-content="latest phones"
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-12"
                      style={{
                        paddingRight: "12px",
                        paddingLeft: "12px",
                      }}
                    >
                      <div
                        className={`${styles.side__bar__phones} ${styles.box__sizing__phone} ${styles.cards__phone}`}
                      >
                        {showSideBarMobiles()}
                      </div>
                      <div
                        style={{
                          height: "3px",
                          width: "100%",
                          margin: 0,
                          backgroundColor: "#505050",
                        }}
                      />
                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            float: "right",
                            marginBottom: "10px",
                            marginTop: "6px",
                          }}
                        >
                          <div style={{ marginRight: 0 }}>
                            <Link href={`/phones`}>
                              <a style={{ textDecoration: "none" }}>
                                <div className={styles.view_all}>
                                  <span>view all</span>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {news.length !== 0 ? (
                  <div
                    className={`row mr-0 ${styles.side__bar__single__brand}`}
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0px 0px 1px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div
                      className="col-md-12"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        marginTop: "20px",
                      }}
                    >
                      <div style={{ marginRight: "5px" }}>
                        <FaNewspaper size="1rem" color="#505050" />
                      </div>
                      <div style={{ width: "100%", paddingTop: 0 }}>
                        <hr
                          style={{ marginTop: "7px" }}
                          className={styles.hrText}
                          data-content="latest news"
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-12"
                      style={{
                        paddingTop: "15px",
                        paddingRight: "12px",
                        paddingLeft: "12px",
                      }}
                    >
                      {showSideBarNews()}
                      <div
                        style={{
                          height: "3px",
                          width: "100%",
                          margin: 0,
                          backgroundColor: "#505050",
                        }}
                      />
                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            float: "right",
                            marginBottom: "10px",
                            marginTop: "6px",
                          }}
                        >
                          <div style={{ marginRight: 0 }}>
                            <Link href={`/news`}>
                              <a style={{ textDecoration: "none" }}>
                                <div className={styles.view_all}>
                                  <span>view all</span>
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            style={{
              textAlign: "center",
              top: "50%",
              bottom: "50%",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              padding: "auto",
            }}
          >
            <Loader
              type="Bars"
              color="rgba(202, 28, 28, 0.945)"
              height={100}
              width={100}
              timeout={30000} //3 secs
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

// This also gets called at build time
export async function getStaticProps() {
  /**done */
  const reviews = await reviewListPublic().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return data;
    }
  });

  /**done */
  const news = await newsListPublicMobileReviews().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return data;
    }
  });

  /**done */
  const mobiles = await mobileListPublicNewsReviews().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return data;
    }
  });

  return {
    props: {
      news,
      reviews,
      mobiles,
    },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}

export default AllReviews;
