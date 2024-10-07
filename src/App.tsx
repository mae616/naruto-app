import { useEffect, useState } from "react";
import axios from "axios";
import dummyImage from "./assets/dummy.png";
import logoImg from "./assets/logo.png";
import { Helmet } from "react-helmet-async";
import { Loading } from "./Loading";
import { Character } from "./types";

const pageButtonStyle = `
  w-[125px]
  mx-[10px]
  py-2
  px-4
  text-white
  bg-gray-800
  border
  border-solid
  border-gray-800
  rounded
  cursor-pointer
  transition-colors
  ease-in-out
  hover:duration-300
  hover:bg-gray-700
  hover:border-gray-800
  disabled:text-gray-100
  disabled:bg-gray-400
  disabled:border-gray-400
  disabled:cursor-default
`;

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
        <title>Naruto App</title>
        <meta name="description" content="Naruto characters database" />
      </Helmet>
      <div pt-0 className="container">
        <div
          flex
          justify-between
          items-center
          px-2
          p="y-[16px]"
          bg="#bce2e8"
          className="header"
        >
          <div
            w-full
            max-w="1280px"
            m="x-auto"
            text-left
            className="header-content"
          >
            <img
              m="r-[16px]"
              w="100px"
              h="50px"
              src={logoImg}
              alt="logo"
              className="logo"
            />
          </div>
        </div>
        <Loading isLoading={isLoading}>
          <main m="y-12 x-auto" px-2 max-w="1280px">
            <div
              grid
              grid-cols-3
              max-md:grid-cols-2
              gap="16px"
              className="cards-container"
            >
              {characters.map((character) => {
                return (
                  <div overflow-hidden className="card" key={character.id}>
                    <img
                      rounded-lg
                      w-full
                      h="192px"
                      max-md:h="150px"
                      object-cover
                      src={character.images[0] ?? dummyImage}
                      alt={character.name}
                      className="card-image"
                    />
                    <div p-2 className="card-content">
                      <h3
                        m-0
                        text-lg
                        font-semibold
                        max-md:text-base
                        className="card-title"
                      >
                        {character.name}
                      </h3>
                      <p text-sm max-md:text-xs className="card-description">
                        {character.debut?.appearsIn ?? "なし"}
                      </p>
                      <div
                        flex
                        justify-between
                        items-center
                        mt-2
                        className="card-footer"
                      >
                        <span
                          text-sm
                          font-medium
                          max-md:text-xs
                          className="affiliation"
                        >
                          {character.personal?.affiliation ?? " なし"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              w-fit
              mt-12
              mx-auto
              text-center
              flex
              items-baseline
              gap-2
              text-gray-800
              className="pager"
            >
              <button
                disabled={page === 1}
                className={`prev ${pageButtonStyle}`}
                onClick={handlePrev}
              >
                Previous
              </button>
              <span mx-2 text="1.1em" className="page-number">
                {page}
              </span>
              <button
                disabled={limit > characters.length}
                className={`next ${pageButtonStyle}`}
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
