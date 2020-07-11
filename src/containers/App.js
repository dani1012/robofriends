import React , {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import './App.css';
// import {robots} from './robots';

import {setSearchField, requestRobots} from '../actions'

const mapStateToProps = state => {
	return {
	  searchField: state.searchRobots.searchField,         //state from reducer
	  robots: state.requestRobots.robots,
	  isPending: state.requestRobots.isPending,
	  error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	  onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
      onRequestRobots: () => dispatch(requestRobots())
    }
}


class App extends Component {    
   
  //  constructor(){
	 // super()
	 // this.state = {
		// robots: [],
		// // searchfield: ''
	 // }
  //  }

   componentDidMount() {
      this.props.onRequestRobots();

   	// fetch('https://jsonplaceholder.typicode.com/users')
	   // 	.then(response => response.json())
	   // 	.then(users => this.setState({robots : users}));
   
   }

//    onSearchChange= (event)=> {
   
// 	this.setState({searchfield: event.target.value})  
		
// }
   

render() {		
            const {searchField,onSearchChange,robots,isPending} = this.props;    
			const filteredRobots = robots.filter(robot =>{
			  return robot.name.toLowerCase().includes(searchField.toLowerCase());
			}) 
   // if there are no robots, we are Loading
       if (isPending) {
       	 return <h1>Loading</h1>      
       } else {
		 return (
				<div className = 'tc'>
					  <h1 >RobotFriends</h1>
					  <SearchBox searchChange = {onSearchChange}/>  
					  <Scroll>
					     <CardList robots = {filteredRobots} />
		              </Scroll>
				</div>
					);

            }	
     }	

  }

//subscribe to any state changes in the store
export default connect(mapStateToProps,mapDispatchToProps)(App);




