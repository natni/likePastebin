import React, { useState, FormEvent } from 'react';
//import logo from './logo.svg';
import s from './S.png';
import './App.css';
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var CryptoJS = require("crypto-js");


class App extends React.Component<any, any>  {

  constructor(props: any) {
    super(props);
    this.state = {
      postId: null
    };

  }
  App() {
    //encrypt whatever is in the text box
    
    const element = (document.getElementById('myTextArea') as HTMLInputElement).value;
    alert(element);
    let keyUtf8 = CryptoJS.enc.Utf8.parse('my-secret-key@123')
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(element,keyUtf8,{
      mode: CryptoJS.mode.ECB,
      keySize: 128,
      });
    //log encrypted data
    alert('Encrypt Data -')
    alert(ciphertext);
  
    // Decrypt
    var decryptedBytes = CryptoJS.AES.decrypt(ciphertext, keyUtf8,{
      mode: CryptoJS.mode.ECB,
      keySize: 128,
      });
    var decryptedData = decryptedBytes.toString();
  
    //log decrypted Data
    alert('decrypted Data -')
    alert(decryptedData);
  }



  componentDidMount() {
    const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json',);

      // Simple POST request with a JSON body using fetch
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'React POST Request Example' })
      };
      fetch('http://localhost:8080/greeting', { mode: 'no-cors' },)
      
          .then(response => response.json())
          .then(data => this.setState({ postId: data.id }));
  }

  render(){

    const { postId } = this.state;
    
    return (

      <div>
        <div className="header">
          <img src={s} alt="secure share" className="img2" />
          <button id="newFormButton"> + New</button>
        </div>

        <form action="">
          <div className="body">
            <h1>Title</h1>
            <input id="myTitle"></input>
            
            <h1>Text</h1>
            <textarea ng-model="myTextArea" id="myTextArea" placeholder="Put your message here:)"></textarea>
            <br></br>
            
            <input type="file" id="myFile" name="filename"></input>
          </div>

          <div className="settings">
            
            <div className="privacy">
              <h1>Privacy</h1>
              <label className="privacyChoices">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  className="PrivacyFormInput" />
                Private
              </label>
              <br/>
              <label className="privacyChoices">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  className="PrivacyFormInput" />
                Public
              </label>
            </div>

            <div className="expiration">
              <h1>Expiration</h1>
              <label className="expireChoices">
                  <input
                    type="radio"
                    name="expire"
                    value="never"
                    className="expirationFormInput" />
                  Never
              </label>
              <br/>
              <label className="expireChoices">
                <input
                  type="radio"
                  name="expire"
                  value="time" /*NEED TO ADD TIME CHOICE and dropdown for min/days/etc*/
                  className="expirationFormInput" /> 
                Set Expiration Day 
                <input type="text" id="count" placeholder="mm/dd/yyyy" />
              </label>
            </div>
          </div>

          <br></br>
          <input type="submit" id="create"></input>
        </form>
      </div>

    );
  }
};

export default App;
