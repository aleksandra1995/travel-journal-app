import React, { Component } from 'react'
import Header from './Header'
import Pin from '../img/pin.png'


 class Map extends Component {
     state = {
         pins: []
         
     }

     componentDidMount() {
         fetch('http://localhost:3000/pins')
         .then(resp => resp.json())
         .then(pins => this.setState({pins})
         )
     }
     

    mapClicked = (e) => {

      fetch('http://localhost:3000/pins', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: this.props.user.id,
            x: e.clientX,
            y: e.clientY - 50,
            url: 'https://firebasestorage.googleapis.com/v0/b/travel-journal-617e9.appspot.com/o/images%2Fpin.png?alt=media&token=305692c1-7b77-440b-8dad-707b72f3a78c'
        })
    })
    .then(resp => resp.json())
    .then(pin => this.setState({
        pins: [...this.state.pins, pin]
    })
    )
    }

   

    render() {

        const userPins = this.state.pins.filter(pins => {
            return pins.user.id === this.props.user.id
        })

        const pins = userPins.map(pin => {
            return <img style={{height: '3em', position: 'absolute', left: pin.x , top: pin.y }} src='https://firebasestorage.googleapis.com/v0/b/travel-journal-617e9.appspot.com/o/images%2Fpin.png?alt=media&token=305692c1-7b77-440b-8dad-707b72f3a78c' />
        })

        return (
            <div>

        
            <Header clearUser={this.props.clearUser} user={this.props.user}/>
            <header className="countryInfo">Click on a Country on the Map to Tag a Place You have Traveled</header>

            <div onClick={this.mapClicked} className="mapContainer">
            <div>
            {pins}
            </div>
            </div>
            </div>
        )
    }
}

export default Map
