const DB_NAME = "StudentManagementDB";
const DB_VERSION = 1;
const STORE_STUDENTS = "students";
const STORE_PENDING = "pendingOperations";

// Initialize IndexedDB
export const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_STUDENTS)) {
                db.createObjectStore(STORE_STUDENTS, { keyPath: "_id" });
            }
            if (!db.objectStoreNames.contains(STORE_PENDING)) {
                db.createObjectStore(STORE_PENDING, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

// Students Store Operations
export const saveStudentsToIndexedDB = async (students) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STUDENTS, "readwrite");
        const store = transaction.objectStore(STORE_STUDENTS);
        
        // Clear existing data
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => {
            students.forEach((student) => store.put(student));
        };
        
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = (event) => reject(event.target.error);
    });
};

export const getStudentsFromIndexedDB = async () => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STUDENTS, "readonly");
        const store = transaction.objectStore(STORE_STUDENTS);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = (event) => reject(event.target.error);
    });
};

export const updateStudentInIndexedDB = async (student) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STUDENTS, "readwrite");
        const store = transaction.objectStore(STORE_STUDENTS);
        store.put(student);
        
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = (event) => reject(event.target.error);
    });
};

export const deleteStudentFromIndexedDB = async (id) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_STUDENTS, "readwrite");
        const store = transaction.objectStore(STORE_STUDENTS);
        store.delete(id);
        
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = (event) => reject(event.target.error);
    });
};

// Pending Operations Store
export const addPendingOperation = async (operation) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_PENDING, "readwrite");
        const store = transaction.objectStore(STORE_PENDING);
        store.put(operation);
        
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = (event) => reject(event.target.error);
    });
};

export const getPendingOperations = async () => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_PENDING, "readonly");
        const store = transaction.objectStore(STORE_PENDING);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = (event) => reject(event.target.error);
    });
};

export const clearPendingOperation = async (id) => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_PENDING, "readwrite");
        const store = transaction.objectStore(STORE_PENDING);
        store.delete(id);
        
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = (event) => reject(event.target.error);
    });
};
