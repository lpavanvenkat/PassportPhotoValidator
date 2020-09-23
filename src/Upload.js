import React, { Component } from 'react';
import {Button,Form,FormGroup} from 'reactstrap';
import FileBase64 from 'react-file-base64';
import './Upload.css';
class Upload extends Component {
    constructor(props)
    {
        super();
        this.state={
            files:[],
            Result:[],
            ifperson :'',
        }
        this.fileupload =this.fileupload.bind(this);
    }
  

    getfiles(files)
    {
        this.setState({files:files});
        //console.log(files);
    }

    async fileupload()
    {
       const response= await fetch ('https://9wds7npssf.execute-api.us-east-1.amazonaws.com/Prod/passportphoto',
       {
           method :'POST',
           headers:{
               Accept : "application/json",
               "Content-type":"application/json"
           },
           body :JSON.stringify({photo :this.state.files['base64']})
       })
       //console.log(response)
       const resp =await response.json();
       this.setState({Result:resp.body})
        //console.log(this.state.Result)
        //if(this.state.Result === undefined)
        const FaceDetails = JSON.parse(this.state.Result)
       if(FaceDetails['FaceDetails'][0] === undefined)
       {
           this.setState({ifperson :'invalid photo! please upload again'})
           console.log("invalid photo!")
       }else{
        this.setState({ifperson :'valid photo! Thanks for uploading'})
           console.log("valid photo")
       }
    }
    render() { 
        const ifperson=this.state.ifperson
        return ( 
        <div>
            <div className="row">
                <div className="col-6 offset-3">
                    <h4>PassportPhoto validator</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-6 offset-3 files">
                    <FileBase64 multiple={false} onDone ={this.getfiles.bind(this)}/>
                </div>
            </div>
            <div className="row">
                <div className="col-6 offset-3">
                    <Button className="btn btn-lg btn-danger btn-block" onClick={this.fileupload}>Verify my photo</Button>
                </div>
            </div>
            <div className="row">
                <div className="col-6 offset-3">
                    <img src={this.state.files.base64} width='40%'/>
                </div>
            </div>
            <div className="row">
                <div className="col-6 offset-3">
                    {ifperson}
                </div>
            </div>
        </div> );
    }
}
 
export default Upload;