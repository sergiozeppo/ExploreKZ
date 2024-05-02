import { useState } from 'react';

// Главный компонент внутри которого будут распологаться остальные компоненты

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            Privet
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            </div>
        </>
    );
}

export default App;
