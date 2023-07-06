import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [localNews, setLocalNews] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
    (async () => {
      try {
        const newsObj = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.REACT_APP_API_KEY}`);
        setNews(newsObj.data.articles);
        const articles = localStorage.getItem("newsArticles");
        setLocalNews(JSON.parse(articles) || []);
      } catch (error) {
        console.log(error);
      }

    })();

  }, []);

  useEffect(() => {
    if (!firstRender) localStorage.setItem("newsArticles", JSON.stringify(localNews));
  }, [localNews]);

  return (
    <div className="App">
      <header className="App-header">
        <Link to={'/'}>Home</Link>
        <Link to={'/bookmarks'}>Bookmarks</Link>
      </header>
      <main className='App-body'>
        {news.map(({ title, urlToImage, description, publishedAt, author, source, url }, idx) => {
          try {
            return <div className='news-card' key={idx}>
              <div className="news__header">
                <div className="news__title"><a href={url}>{title}</a></div>
                <div className="news__bookmark-icon" onClick={() => {
                  if (localNews.filter((news) => news.title === title).length === 0) setLocalNews([...localNews, news[idx]]);
                  else {
                    setLocalNews(localNews.filter((news) => news.title !== title));
                  }
                }}>
                  <i className={`fa fa-bookmark${localNews.filter((news) => news.title === title).length > 0 ? '' : '-o'}`} aria-hidden="true"></i>
                </div>
              </div>
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
      </main>
    </div>
  );
}

export default App;
