import React from 'react';
import './../assets/css/header.css';

const subMenuItems = (branches,change,dealersIndex) =>  branches.map ( (branch, index) => {
    return ( <li key={branch.branch_id} onClick={()=>change(index,dealersIndex)}><span>{branch.name} </span></li> )
})
const mainMenuItems = (props) =>  props.menu.map ( (item, index) => {
    return ( <li key={item.dealers_id}><span>{item.name} </span>
        <ul>{subMenuItems(item.branches,props.change,index)}</ul>
     </li>)
})
const header = (props)=>{
    return (
        <ul className="main-navigation">
            <li key={"rentalManagement"} className="rentalManagement">Rental Management System</li>
            <li key={"rentalManagement1"}><span>Select Location</span>
                <ul>
                {mainMenuItems(props)}
                <li onClick={()=>props.change(-1,-1)}><span>All Locations</span></li>
                </ul>
            </li>
        </ul>
    )
}
export default header;