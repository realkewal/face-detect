import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'f56c5f9284b74a1db6aec5b82882eb76'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        valueArea: 800
      }
    }
  }
};

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    };
  };

  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box});
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onDetectClick = async () => {
    this.setState ({ imageUrl: this.state.input })
    try {

      const response = await app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input
      );

      this.displayFaceBox(this.calculateFaceLocation(response));
    } catch (err) {
      console.error(err);
    };
  };

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation />
        <Logo />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onDetectClick={this.onDetectClick}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  };
};

export default App;
