import React, { Component } from 'react';
import './App.css';
import catalogData from './assets/json/catalog.json';
import Header from './components/header';
import Dashboard from './components/dashboard';
class App extends Component {
  constructor() {
    super();
    this.state = {
      catalogData : catalogData,
      selectedItemFromMenu : null,
      menuItem : null,
      subMenuItem: null,
      branchIndex: null,
      dealerIndex: null,
      allLocations: null
    };
    this.menuChangeHandler = this.menuChangeHandler.bind(this);
    this.clickItemHandler = this.clickItemHandler.bind(this);
    this.clickAllItemHandler = this.clickAllItemHandler.bind(this);
  } 
  menuChangeHandler = (branchsIndex,dealersIndex) => {
    if(branchsIndex == -1 && dealersIndex == -1){
      this.setState( {selectedItemFromMenu: null,
                      allLocations: this.state.catalogData,
                      menuItem : "All Locations",
                      subMenuItem: null,
                      branchIndex: branchsIndex,
                      dealerIndex: dealersIndex
                    });
      }
      else {
        this.setState( {selectedItemFromMenu: this.state.catalogData[dealersIndex].branches[branchsIndex].categories,
          menuItem : this.state.catalogData[dealersIndex].branches[branchsIndex].name,
          allLocations: null,
          subMenuItem: null,
          branchIndex: branchsIndex,
          dealerIndex: dealersIndex
        });
      }
  }
  clickItemHandler = (subIndex) => {
    this.setState(  {selectedItemFromMenu: this.state.selectedItemFromMenu[subIndex].subcategories,
                    subMenuItem : this.state.selectedItemFromMenu[subIndex].name});
  }
  clickAllItemHandler = (dealerIndex,branchIndex,index) => {
    this.setState(  {selectedItemFromMenu: this.state.catalogData[dealerIndex].branches[branchIndex].categories[index].subcategories,
                    subMenuItem : this.state.catalogData[dealerIndex].branches[branchIndex].categories[index].name,
                    allLocations: null,
                   });
  }
  render() {
    return (
    <>
      <Header menu={this.state.catalogData} change={this.menuChangeHandler} />
      {this.state.menuItem != null ? 
      <div className="equipmentCatlog">Equipment Catalog : 
      <span onClick={()=>this.menuChangeHandler(this.state.branchIndex,this.state.dealerIndex)}>{this.state.menuItem}</span>
        {this.state.subMenuItem != null ?
        <span> / {this.state.subMenuItem}</span> :
        null }
      </div> : 
      null}
      {this.state.allLocations != null ?
          this.state.allLocations.map((dealer,dealerIndex) => (
            <div className="main" key={dealer.dealers_id}>
             {dealer.branches.map((branch,branchIndex) => 
                <div className="cards" key={branch.branch_id}>
                  {branch.categories.map((item,index) => (
                    <div key={"tile"+item.image} className="cards_item">
                      <div className="card">
                        <div className="card_image">
                        {item.hasOwnProperty("image") ? 
                            <img src={require("./assets/images/category/"+item.image)} alt={item.name} />
                            : null }
                        </div>
                        <div className="card_content" onClick={()=>this.clickAllItemHandler(dealerIndex,branchIndex,index)}>{item.name} &#x25BA;</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
      : this.state.selectedItemFromMenu == null ? <div className="dashboardEmpty"> <p>Welcome To <br />Rental Management System</p><span>Please Select Location.</span> </div> : <Dashboard selectedItem={this.state.selectedItemFromMenu} click={this.clickItemHandler}/>}
    </>
    )
  }
}
export default App;