import { useEffect, useState } from "react";
import { db } from "./data/db";
import Header from "./components/Header";
import GeneralGuitar from "./components/GeneralGuitar";
import { Guitar } from "./types";


function App() {
  const inicialCard = () => {
    const localStorageCard = localStorage.getItem("card");
    return localStorageCard ? JSON.parse(localStorageCard) : [];
  }
  const [data, setData] = useState<Guitar[]>([]);
  const [card, setCard] = useState<Guitar[]>(inicialCard);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    setData(db);
  }, []);

  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(card))
  }, [card]);

  function addToCard(guitar: Guitar) {
    const guitarExist = card.findIndex((item) => item.id === guitar.id);
    if (guitarExist >= 0) {
      const updateCard = [...card];
      updateCard[guitarExist].quantity! += 1;
      setCard(updateCard);
    } else {
      guitar.quantity = 1;
      setCard([...card, guitar])
    }
  }

  function removeFromCard(id: any): void {
    setCard(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id: any): void {
    const updateCard = card.map(item => {
      if (item.id === id && item.quantity! < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity! + 1
        }
      }
      return item
    })
    setCard(updateCard)
  }

  function decreaseQuantity(id: any): void {
    const updateCard = card.map(item => {
      if (item.id === id && item.quantity! > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity! - 1
        }
      }
      return item
    })
    setCard(updateCard)
  }

  function clearCart(): void {
    setCard([])
  }

  return (
    <>
      <Header
        card={card}
        removeFromCard={removeFromCard}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <GeneralGuitar
              guitar={guitar}
              key={guitar.id}
              setCard={setCard}
              addToCard={addToCard} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
