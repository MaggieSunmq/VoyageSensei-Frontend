import React from 'react';
import { useNavigate } from 'react-router-dom';

function Understand({ nextClick }) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="content">
                <div className="left-panel">
                    <h1>This is a placeholder page for understanding the user preference</h1>
                    <button onClick={nextClick} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                        Next
                    </button>
                </div>
                <div className="right-panel">
                    {/* Placeholder for additional content or components */}
                </div>
            </div>
        </div>
    );
}

export default Understand;
