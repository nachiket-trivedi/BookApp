import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
let bookDeleted=false;
class Delete extends Component{

    constructor(props){
        super(props);
        this.state = {
            id: ""
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }
    
    deleteBook=(e)=>{
        e.preventDefault();
    const data = {
        bookid : this.bdel.value
    }
    if(this.state.id != ""){
    axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {            
                console.log("Status Code : ",response.status);
                response.status === 200;   
                bookDeleted=true;  
            })
            .catch(response => {
                alert("This book doesn't exist :(");
                this.bdel.value = "";
            })
            .finally(    response => {
                console.log(bookDeleted);
                this.setState({
                })
            }
            )
        }
        else{
            alert('ID should not be empty');
        }
    }

    handleDelete(e){
        console.log("INSIDE HANDLE DELETE");
        this.setState({
            id: e.target.value
        })
    }
    
    render(){
        let redirectVar = null;
        if(bookDeleted){
            redirectVar = <Redirect to= "/home"/>
        }
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div class="container">
                {redirectVar}
                {bookDeleted=false}
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input ref={(ref) => this.bdel=ref} type="text" class="form-control" value = {this.state.id} onChange = {this.handleDelete} name="BookID" placeholder="Search a Book by Book ID" required/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" onClick={this.deleteBook} type="submit">Delete</button>
                    </div> 
                </form>
            </div>
        )
    }
}

export default Delete;