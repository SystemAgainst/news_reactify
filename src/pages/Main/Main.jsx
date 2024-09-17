import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner.jsx";
import {useEffect, useState} from "react";
import {getNews} from "../../api/news.js";
import NewsList from "../../components/NewsList/NewsList.jsx";

const Main = () => {
    const [newsState, setNewsState] = useState([]);
    const fetchNews = async () => {
        try {
            const { news } = await getNews();
            setNewsState(news);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <main className={styles.main}>
            {
                newsState.length > 0
                    ? <NewsBanner item={newsState[0]} />
                    : null
            }

            <NewsList news={newsState} />
        </main>
    )
}

export default Main