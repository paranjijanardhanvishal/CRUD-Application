import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from '../services/api';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeRequests, setActiveRequests] = useState(0);

    useEffect(() => {
        const handleRequest = (config) => {
            setActiveRequests((prev) => prev + 1);
            setIsLoading(true);
            return config;
        };

        const handleResponse = (response) => {
            setActiveRequests((prev) => {
                const newCount = prev - 1;
                if (newCount <= 0) setIsLoading(false);
                return Math.max(0, newCount);
            });
            return response;
        };

        const handleError = (error) => {
            setActiveRequests((prev) => {
                const newCount = prev - 1;
                if (newCount <= 0) setIsLoading(false);
                return Math.max(0, newCount);
            });
            return Promise.reject(error);
        };

        // Intercept default axios instance
        const reqInterceptor = axios.interceptors.request.use(handleRequest, handleError);
        const resInterceptor = axios.interceptors.response.use(handleResponse, handleError);

        // Intercept apiClient instance
        const apiReqInterceptor = apiClient.interceptors.request.use(handleRequest, handleError);
        const apiResInterceptor = apiClient.interceptors.response.use(handleResponse, handleError);

        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
            
            apiClient.interceptors.request.eject(apiReqInterceptor);
            apiClient.interceptors.response.eject(apiResInterceptor);
        };
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10000,
                    backdropFilter: 'blur(2px)' // Optional a nice effect
                }}>
                    <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem', borderWidth: '0.4em' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    );
};
