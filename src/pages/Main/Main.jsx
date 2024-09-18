import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner.jsx";
import { useEffect, useState } from "react";
import { getNews } from "../../api/news.js";
import NewsList from "../../components/NewsList/NewsList.jsx";
import Skeleton from "../../components/Skeleton/Skeleton.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

const Main = () => {
    const [newsState, setNewsState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async (currentPage) => {
        try {
            setNewsState([]);
            setIsLoading(true);
            const { news } = await getNews(currentPage, pageSize);
            setNewsState(news);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNews(currentPage)
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <main className={styles.main}>
            {
                newsState.length > 0 && !isLoading
                    ? <NewsBanner item={newsState[0]} />
                    : <Skeleton type={'banner'} count={1} />
            }

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handleClickPage={handleClickPage}
                handlePrevPage={handlePrevPage}
            />

            {
                !isLoading
                    ? <NewsList news={newsState} />
                    : <Skeleton type={'item'} count={10} />
            }
        </main>
    )
}

export default Main