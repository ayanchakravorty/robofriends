import React,{ Component } from 'react';
import RobotsList from '../RobotsList/RobotsList';
import SearchBox from '../Utility/SearchBox';
import Scroll from '../Utility/Scroll';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchText: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((data) => this.setState({
            robots: data
        }))
    }

    onSearch = (event) => {
        this.setState({
            searchText: event.target.value.toLowerCase(),
        });
    }

    render() {
        const { robots, searchText } = this.state;
        const filteredRobots = robots.filter((robot) => 
            robot.name.toLowerCase().includes(searchText.toLowerCase())
        );
        return robots.length === 0 ? (
            <h1>Loading...</h1>
            ) : (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox onSearch={this.onSearch} />
                <Scroll>
                    <ErrorBoundary>
                        <RobotsList robots={filteredRobots} searchText={this.state.searchText} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        )
    }
}

export default App;