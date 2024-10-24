
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
      INSERT INTO address (address, city) VALUES ('Mannerheimintie 10', 'Helsinki');
      INSERT INTO address (address, city) VALUES ('Asemakuja 2', 'Espoo');
      INSERT INTO address (address, city) VALUES ('Ratakatu 15', 'Tampere');
    `);
    console.log('Address table created and test data inserted successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
};

export const saveItem = async (address, city) => {
  try {
    if(!db) {
      db = await openDatabaseAsync(); 
    }
    await db.runAsync('INSERT INTO address (address, city) VALUES (?, ?)', [address, city]);
    // Todo: update the course list
  } catch (error) {
    console.error('Could not add item', error);
  }
};



//kontekstin luominen places ja maps komponenttia varten
const DatabaseContext = createContext();

//Provider
//Tiedot tietokannasta dbData muuttujaan ja alustus ensimmäisellä kerralla app.jsx lisätessä
export const DatabaseProvider = ({ children }) => {
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

