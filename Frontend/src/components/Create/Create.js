import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
var bookAdded = false;

class Create extends Component{
    createNew =(e)=>{
        e.preventDefault();
        const data = {
            bookid : this.bid.value,
            booktitle : this.btitle.value,
            bookauthor : this.bauthor.value
        }
        //set the with credentials to true
        if(data.bookid != "" && data.booktitle != "" && data.bookauthor != "" ){

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/create',data)
            .then(response => {            
                console.log("Status Code : ",response.status);
                response.status === 200;   
                bookAdded=true;  
            })
            .catch(response => {
                alert("This book already exists :(");
                this.bid.value = "";
                this.btitle.value = "";  
                this.bauthor.value = "";
            })
            .finally(    response => {
                console.log(bookAdded);
                this.setState({
                })
            }
            )
        }
        else{
            alert('Should not be empty :(');
        }
    }   
    render(){            
        let redirectVar = null;
        if(bookAdded){
            redirectVar = <Redirect to= "/home"/>
        }
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                {bookAdded=false}
                <br/>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <div style={{width: '30%'}} class="form-group">
                            <input ref={(ref) => this.bid=ref} type="text" class="form-control" name="BookID" placeholder="Book ID" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input ref={(ref) => this.btitle=ref} type="text" class="form-control" name="Title" placeholder="Book Title" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input ref={(ref) => this.bauthor=ref} type="text" class="form-control" name="Author" placeholder="Book Author" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button class="btn btn-success" type="submit" onClick={this.createNew}>Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;








