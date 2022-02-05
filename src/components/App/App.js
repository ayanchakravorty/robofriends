import React,{ useEffect, useState } from 'react';
import RobotsList from '../RobotsList/RobotsList';
import SearchBox from '../Utility/SearchBox';
import Scroll from '../Utility/Scroll';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import './App.css';

export const App = () => {
    const [robots, setRobots] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((data) =>
            setRobots(data)
        );
    }, []);

    const onSearch = (event) =>
        setSearchText(event.target.value.toLowerCase());

    const filteredRobots = robots.filter((robot) => 
        robot.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return robots.length === 0 ? (
        <h1>Loading...</h1>
        ) : (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox onSearch={onSearch} />
            <Scroll>
                <ErrorBoundary>
                    <RobotsList robots={filteredRobots} searchText={searchText} />
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default App;