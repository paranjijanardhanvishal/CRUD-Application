import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="d-flex bg-light" style={{ minHeight: '100vh' }}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            
            <div 
                className="flex-grow-1 d-flex flex-column" 
                style={{ 
                    marginLeft: '0', 
                    transition: 'margin-left 0.3s',
                    width: '100%' 
                }}
            >
                <Topbar toggleSidebar={toggleSidebar} />
                
                <main className="p-4" style={{ flexGrow: 1, overflowY: 'auto' }}>
                    {children}
                </main>
            </div>

            <style>{`
                @media (min-width: 768px) {
                    .flex-grow-1 {
                        margin-left: 250px !important;
                        width: calc(100% - 250px) !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default MainLayout;
