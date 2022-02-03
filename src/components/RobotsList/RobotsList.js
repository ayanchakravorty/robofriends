import React from 'react';
import Card from './Card';

const RobotsList = ({  robots, searchText }) => (
    <div className='tc pa5'>
        {robots.map((robot, i) => <Card key={i} id={robot.id} name={robot.name} email={robot.email} />)}
    </div>
)

export default RobotsList;