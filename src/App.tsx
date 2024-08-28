import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import dummyImage from "./assets/dummy.png";
import logoImg from "./assets/logo.png";
import { Helmet } from "react-helmet-async";
import { Loading } from "./Loading";
import { Character } from "./types";

function App() {
  const limit = 15;
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCharacters(page);
  }, []);

  const fetchCharacters = async (page: number) => {
    const apiUrl = "https://narutodb.xyz/api/character";

    setIsLoading(true);
    const result = await axios.get(apiUrl, { params: { page, limit } });
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };

  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  };

  return (
    <>
      <Helmet>
        <title>NarutoDB</title>
        <meta name="description" content="Naruto characters database" />
      </Helmet>
      <div flex className="container">
        <div className="header">
          <div className="header-content">
            <img src={logoImg} alt="logo" className="logo" />
          </div>
        </div>
        <Loading isLoading={isLoading}>
          <main>
            <div className="cards-container">
              {characters.map((character) => {
                return (
                  <div className="card" key={character.id}>
                    <img
                      src={character.images[0] ?? dummyImage}
                      alt={character.name}
                      className="card-image"
                    />
                    <div className="card-content">
                      <h3 className="card-title">{character.name}</h3>
                      <p className="card-description">
                        {character.debut?.appearsIn ?? "なし"}
                      </p>
                      <div className="card-footer">
                        <span className="affiliation">
                          {character.personal?.affiliation ?? " なし"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pager">
              <button
                disabled={page === 1}
                className="prev"
                onClick={handlePrev}
              >
                Previous
              </button>
              <span className="page-number">{page}</span>
              <button
                disabled={limit > characters.length}
                className="next"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </main>
        </Loading>
      </div>
    </>
  );
}

export default App;
