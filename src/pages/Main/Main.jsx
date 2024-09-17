import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner.jsx";
import { useEffect, useState } from "react";
import { getNews } from "../../api/news.js";
import NewsList from "../../components/NewsList/NewsList.jsx";
import Skeleton from "../../components/Skeleton/Skeleton.jsx";

const Main = () => {
    const [newsState, setNewsState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNews = async () => {
        try {
            setNewsState([]);
            setIsLoading(true);
            const { news } = await getNews();
            setNewsState(news);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <main className={styles.main}>
            {
                newsState.length > 0 && !isLoading
                    ? <NewsBanner item={newsState[0]} />
                    : <Skeleton type={'banner'} count={1} />
            }

            {
                !isLoading
                    ? <NewsList news={newsState} />
                    : <Skeleton type={'item'} count={10} />
            }
        </main>
    )
}

export default Main