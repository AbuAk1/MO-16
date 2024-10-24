
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';


//Avaa tai luo tietokanta
const openDatabaseAsync = async () => {
  return await SQLite.openDatabaseAsync('address.db');
};

//alusta muuttuja tietokannalle setup funktiotavarten
let db;

//Setup ja suorita luonti ja testidatat exec-funktiolla (Huom!! ei turvallinen ). Pragma journal mahdollistaa luonnin ja testidatan lisääminsen samassa komennossa
export const setupDatabase = async () => {
  try {
    db = await openDatabaseAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS address (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT NOT NULL,
        city TEXT NOT NULL
      );
      INSERT INTO address (address, city) VALUES ('Mannerheimintie 10 Helsinki', 'Helsinki');
      INSERT INTO address (address, city) VALUES ('Asemakuja 2 Espoo', 'Espoo');
      INSERT INTO address (address, city) VALUES ('Ratakatu 15 Tampere', 'Tampere');
    `);
    console.log('Address table created and test data inserted successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

//Tallenna osoite
export const saveItem = async (address, city,setDbData) => {
  try {
    //tarkista onko db ja jos ei niin avaa
    if(!db) {
      db = await openDatabaseAsync(); 
    }
    //tallenna uusi osoite tietokantaan
    await db.runAsync('INSERT INTO address (address, city) VALUES (?, ?)', [address, city]);
    //päivitä tietokanta
    const allRows = await db.getAllAsync('SELECT * FROM address');
    setDbData(allRows);
    
  } catch (error) {
    console.error('Could not add item', error);
  }
};

//poista osoite id:llä
export const deleteItem = async (id,setDbData) => {
  try {
    //tarkista onko db ja jos ei niin avaa
    if(!db) {
      db = await openDatabaseAsync(); 
    }
    //poista id:llä tietokannasta
    await db.runAsync('DELETE FROM address WHERE id=?', id);
    //päivitä tietokanta
    const allRows = await db.getAllAsync('SELECT * FROM address');
    setDbData(allRows);
    
  }
  catch (error) {
    console.error('Could not delete item', error);
  }
}



//kontekstin luominen places ja maps komponenttia varten
const DatabaseContext = createContext();

//Provider
//Tiedot tietokannasta dbData muuttujaan ja alustus ensimmäisellä kerralla app.jsx lisätessä
export const DatabaseProvider = ({ children }) => {
  //dbData sisältää taulun tiedot ja sitä käytetään places.jsx komponentissa flatlistassa
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await setupDatabase();
        const allRows = await db.getAllAsync('SELECT * FROM address');
        setDbData(allRows);
      } catch (error) {
        console.error('Error initializing database in provider:', error);
      }
    };

    initDatabase();
  }, []);

  return (
    <DatabaseContext.Provider value={{ dbData, setDbData }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// tietokannan kontekstiin pääsyyn
export const useDatabase = () => {
  return useContext(DatabaseContext);
};

