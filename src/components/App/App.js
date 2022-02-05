import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import RobotsList from '../RobotsList/RobotsList';
import SearchBox from '../Utility/SearchBox';
import Scroll from '../Utility/Scroll';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import './App.css';

import { setSearchText, requestRobots } from '../../actions';

const mapStateToProps = (state) => ({
    searchText: state.searchRobots.searchText,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error,
    isPending: state.requestRobots.isPending,
})

const mapDispatchToProps = (dispatch) => ({
    onSearch: (event) => dispatch(setSearchText(event.target.value.toLowerCase())),
    onRequestRobots: () => dispatch(requestRobots())
})

export const App = (props) => {
    // const [robots, setRobots] = useState([]);
    // const [searchText, setSearchText] = useState('');
    const funcCall = () => {
        props.onRequestRobots();
    }
    useEffect(() => {
        funcCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const onSearch = (event) =>
    //     setSearchText(event.target.value.toLowerCase());

    const filteredRobots = props.robots.filter((robot) => 
        robot.name.toLowerCase().includes(props.searchText.toLowerCase())
    );

    return props.isPending ? (
        <h1>Loading...</h1>
        ) : (
        <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox onSearch={props.onSearch} />
            <Scroll>
                <ErrorBoundary>
                    <RobotsList robots={filteredRobots} searchText={props.searchText} />
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);