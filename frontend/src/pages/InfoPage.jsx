import React from 'react';

const InfoPage = ({ countryData }) => {
  const { 
    name, 
    flag, 
    overview, 
    panoramaUrl, 
    language, 
    cuisine, 
    traditions, 
    dailyLife, 
    images 
  } = countryData;

  return (
    <div className="country-page">
      <header className="country-header">
        <img src={flag} alt={`${name} flag`} className="country-flag" />
        <h1>{name}</h1>
      </header>

      <section className="overview-section">
        <h2>Overview</h2>
        <p>{overview.description}</p>
        <div className="key-facts">
          <h3>Key Facts</h3>
          <ul>
            {overview.keyFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panorama-section">
        <h2>Explore {name}</h2>
        <div className="panorama-container">
          <iframe 
            src={panoramaUrl} 
            allowFullScreen 
            className="panorama-iframe"
            title={`360° view of ${name}`}
          ></iframe>
        </div>
        <p className="panorama-note">Use your mouse to navigate the 360° view</p>
      </section>

      <section className="language-section">
        <h2>Language & Communication</h2>
        <h3>Official Language: {language.name}</h3>
        <div className="phrases">
          <h4>Common Phrases</h4>
          <table>
            <thead>
              <tr>
                <th>Phrase</th>
                <th>Pronunciation</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {language.phrases.map((phrase, index) => (
                <tr key={index}>
                  <td>{phrase.original}</td>
                  <td>{phrase.pronunciation}</td>
                  <td>{phrase.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="cuisine-section">
        <h2>Culinary Experience</h2>
        <p>{cuisine.description}</p>
        <div className="popular-dishes">
          <h3>Popular Dishes</h3>
          <div className="dishes-grid">
            {cuisine.dishes.map((dish, index) => (
              <div key={index} className="dish-card">
                <img src={dish.image} alt={dish.name} />
                <h4>{dish.name}</h4>
                <p>{dish.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="traditions-section">
        <h2>Arts & Traditions</h2>
        <p>{traditions.description}</p>
        <div className="traditions-grid">
          {traditions.examples.map((tradition, index) => (
            <div key={index} className="tradition-card">
              <img src={tradition.image} alt={tradition.name} />
              <h3>{tradition.name}</h3>
              <p>{tradition.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="daily-life-section">
        <h2>Daily Life & Customs</h2>
        <p>{dailyLife.description}</p>
        <div className="customs-list">
          {dailyLife.customs.map((custom, index) => (
            <div key={index} className="custom-item">
              <h3>{custom.title}</h3>
              <p>{custom.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <h2>Photo Gallery</h2>
        <div className="image-gallery">
          {images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image.url} alt={image.caption} />
              <p>{image.caption}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InfoPage;