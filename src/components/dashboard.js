import React from 'react';
import './../assets/css/dashboard.css';
const tiles = (props) =>  
props.selectedItem.map ( (item, index) => {
    return (
    <div key={"tile"+item.image} className="cards_item">
      <div className="card">
        <div className="card_image">
        {item.hasOwnProperty("image") ? 
        item.hasOwnProperty("subcategories") ? 
            <img src={require("./../assets/images/category/"+item.image)} alt={item.name} /> :
            <img src={require("./../assets/images/category/subcategory/"+item.image)} alt={item.name} /> 
            : <div>No Items Found</div> }
        </div>
        {item.hasOwnProperty("subcategories") ? 
            <div className="card_content" onClick={()=>props.click(index)}>{item.name} &#x25BA;
            </div>
        : null }
      </div>
    </div>
    );
});
const dashboard = (props) => {
    return ( <div className="main">
    <div className="cards">
        {tiles(props)}        
  </div>
</div>)
}
export default dashboard;