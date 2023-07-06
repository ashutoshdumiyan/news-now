import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Bookmarks() {

    const [news, setNews] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const articles = localStorage.getItem("newsArticles");
                setNews(JSON.parse(articles) || []);
            } catch (error) {
                console.log(error);
            }

        })();

    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Link to={'/'}>Logo</Link>
                <Link to={'/bookmarks'}>Bookmarks</Link>
            </header>
            <main className='App-body'>
                {news.map(({ title, urlToImage, description, publishedAt, author, source, url }, idx) => {
                    try {
                        return <div className='news-card' key={idx}>
                            <div className="news__title"><a href={url}>{title}</a></div>
                            <button className="news__bookmark-icon" onClick={() => {
                                if (news.filter((news) => news.title === title).length === 0) setNews([...news, news[idx]]);
                                else {
                                    setNews(news.filter((news) => news.title !== title));
                                }
                            }}>
                                <i className={`fa fa-bookmark${news.filter((news) => news.title === title).length > 0 ? '' : '-o'}`} aria-hidden="true"></i>
                            </button>
                            <div className='news__body'>
                                <img src={urlToImage} height={'100'} width={'200'} />
                                <div className="news__description">{description}</div>
                            </div>
                            <div className="news__footer">
                                <div className="news__publised-at">{publishedAt}</div>
                                <div className="news__right-footer">
                                    <div className="news__published-by">{author}</div>
                                    <div className="news__source"><i>source</i>:{source.name}</div>
                                </div>
                            </div>
                        </div>;
                    } catch (error) {
                        console.log(error);
                    }

                })}
            </main>,
            <footer className='App-footer'></footer>
        </div>
    );
}
