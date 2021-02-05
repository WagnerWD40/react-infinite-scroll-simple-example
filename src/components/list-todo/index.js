import { useEffect, useRef, useState } from 'react';

import './styles.css';

import Api from '../../services/api';

function ListToDo() {
    const loaderRef = useRef(null);

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [scrollRatio, setScrollRatio] = useState(null);

    async function getTodos(curPage) {
        setLoading(true);
        const res = await Api.getTodos(curPage);
        setTodos([...todos, ...res]);
        setLoading(false);
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
        setScrollRatio(entries[0].intersectionRatio);
    })

    useEffect(() => {
        getTodos();
        intersectionObserver.observe(loaderRef.current);

        return () => intersectionObserver.disconnect();
    }, []);

    useEffect(() => {
        if (scrollRatio > 0) {
            const newPage = page + 1;
            getTodos(newPage);
            setPage(newPage);
        }
    }, [scrollRatio]);

    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>
                    <h1>{todo.title}</h1>

                    <label htmlFor="completed">Completed?</label>
                    <input id="completed" type="checkbox" defaultChecked={todo.completed} readOnly/>
                </li>
            )}
            <div ref={loaderRef} style={{ display: loading ? 'none' : 'block' }} >Loading...</div>
        </ul>
    );
}

export default ListToDo;