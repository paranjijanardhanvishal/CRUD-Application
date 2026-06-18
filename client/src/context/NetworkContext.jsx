import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getPendingOperations, clearPendingOperation, saveStudentsToIndexedDB } from '../utils/indexedDB';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const NetworkContext = createContext();

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [syncStatus, setSyncStatus] = useState(navigator.onLine ? 'Online' : 'Offline'); // Online, Offline, Syncing, Synced

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setSyncStatus('Online');
            syncPendingOperations();
        };

        const handleOffline = () => {
            setIsOnline(false);
            setSyncStatus('Offline');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const syncPendingOperations = async () => {
        const operations = await getPendingOperations();
        
        if (operations.length === 0) return;
        
        setSyncStatus('Syncing');
        
        try {
            for (const op of operations) {
                if (op.type === 'CREATE') {
                    const formData = new FormData();
                    formData.append("name", op.payload.name);
                    formData.append("email", op.payload.email);
                    formData.append("age", op.payload.age);
                    formData.append("gender", op.payload.gender);
                    formData.append("education", op.payload.education);
                    formData.append("skills", JSON.stringify(op.payload.skills || []));
                    if (op.payload.file) {
                        formData.append("resume", op.payload.file);
                    }
                    await axios.post(`${API_URL}/create`, formData);
                    await clearPendingOperation(op.id);
                } 
                else if (op.type === 'UPDATE') {
                    const formData = new FormData();
                    formData.append("name", op.payload.name);
                    formData.append("email", op.payload.email);
                    formData.append("age", op.payload.age);
                    formData.append("gender", op.payload.gender);
                    formData.append("education", op.payload.education);
                    formData.append("skills", JSON.stringify(op.payload.skills || []));
                    if (op.payload.file) {
                        formData.append("resume", op.payload.file);
                    }
                    await axios.put(`${API_URL}/updateUser/${op.payload.id}`, formData);
                    await clearPendingOperation(op.id);
                }
                else if (op.type === 'DELETE') {
                    await axios.delete(`${API_URL}/deleteUser/${op.payload.id}`);
                    await clearPendingOperation(op.id);
                }
            }

            // After all ops are synced, fetch latest data and update IndexedDB cache
            const result = await axios.get(API_URL);
            await saveStudentsToIndexedDB(result.data);
            
            setSyncStatus('Synced');
            
            // Revert back to Online status after a few seconds
            setTimeout(() => {
                setSyncStatus('Online');
                window.location.reload(); // Refresh the page to show latest data
            }, 2000);

        } catch (error) {
            console.error("Sync failed", error);
            setSyncStatus('Online'); // Or some error state
        }
    };

    return (
        <NetworkContext.Provider value={{ isOnline, syncStatus, syncPendingOperations }}>
            {children}
            
            {/* Status Badge */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 20px',
                borderRadius: '30px',
                color: 'white',
                fontWeight: 'bold',
                zIndex: 9999,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                background: 
                    syncStatus === 'Online' ? '#10b981' :
                    syncStatus === 'Offline' ? '#ef4444' :
                    syncStatus === 'Syncing' ? '#f59e0b' : '#3b82f6',
                transition: 'all 0.3s ease'
            }}>
                {syncStatus === 'Online' && '🟢 Online'}
                {syncStatus === 'Offline' && '🔴 Offline Mode'}
                {syncStatus === 'Syncing' && '⏳ Syncing Data...'}
                {syncStatus === 'Synced' && '✅ Synced'}
            </div>
        </NetworkContext.Provider>
    );
};
