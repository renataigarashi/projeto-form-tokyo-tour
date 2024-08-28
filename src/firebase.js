import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, set, push } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

// Adicione o Storage ao seu firebaseConfig
const firebaseConfig = {
    apiKey: "AIzaSyAC_75mHte-AmowdvuKOwD21ATVRZ0rPPo",
    authDomain: "sitechina-75467.firebaseapp.com",
    databaseURL: "https://sitechina-75467-default-rtdb.firebaseio.com/",
    projectId: "sitechina-75467",
    storageBucket: "sitechina-75467.appspot.com",
    messagingSenderId: "68938957471",
    appId: "1:68938957471:web:c55347424f2bd5f0b458aa"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém as referências para o banco de dados e o armazenamento
const database = getDatabase(app);
const storage = getStorage(app);

// Exporta as funções e objetos necessários
export { database, storage, dbRef, storageRef, set, push, uploadBytes };
