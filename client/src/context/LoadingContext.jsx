import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { apiClient } from '../services/api';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeRequests, setActiveRequests] = useState(0);
    const location = useLocation();

    // Trigger loader on route changes
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            if (activeRequests === 0) {
                setIsLoading(false);
            }
        }, 500); // Route change loading duration
        return () => clearTimeout(timer);
    }, [location.pathname]);

    useEffect(() => {
        let timer;
        if (activeRequests > 0 && !isLoading) {
            setIsLoading(true);
        } else if (activeRequests === 0 && isLoading) {
            timer = setTimeout(() => {
                setIsLoading(false);
            }, 600); // 600ms delay to make it visible
        }
        return () => clearTimeout(timer);
    }, [activeRequests, isLoading]);

    useEffect(() => {
        const handleRequest = (config) => {
            setActiveRequests((prev) => prev + 1);
            return config;
        };

        const handleResponse = (response) => {
            setActiveRequests((prev) => Math.max(0, prev - 1));
            return response;
        };

        const handleError = (error) => {
            setActiveRequests((prev) => Math.max(0, prev - 1));
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
