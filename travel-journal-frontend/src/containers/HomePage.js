import React, { Component } from 'react'
import Header from './Header'
import AuthFolder from './AuthFolder'
import PostContainer from './PostContainer'




class HomePage extends Component {

    state = {
        search: '',
        countries: [],
        currentCountry: {
            currencies: [],
            languages: [],
            timezones: []
        },
        indCountryClicked: false

    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(resp => resp.json())
        .then(countries => this.setState({countries}))
    }
    

    handleOnChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    countryClicked = (country) => {
        this.setState({
            currentCountry: country,
            indCountryClicked: true
        })
        
    }

    goBack = () => {
        this.setState({
            indCountryClicked: false,
            search: ''
        })
    }

    render() {

        let countries = this.state.countries
        countries = countries.filter(country => {
            return country.name.toLowerCase().includes(this.state.search.toLowerCase().trim())
        })

        const filteredCountries = countries.map(country => {
            return <li onClick={() => this.countryClicked(country)} className="listedCountry">
                    {country.name} 
            </li>  
        })

        let currencies = this.state.currentCountry.currencies.map(currency => {
            return currency.name + " , "
        })

        let languages = this.state.currentCountry.languages.map(language => {
            return language.name + " , "
        })

        let timezones = this.state.currentCountry.timezones.map(timezone => {
            return timezone + " , "
        })

        return (
            <div >
                <Header
                user={this.props.user}
                clearUser={this.props.clearUser}
                addStoryButton={this.props.addStoryButton}/>

                {localStorage.token ? null :<AuthFolder
                signUserUp={this.props.signUserUp}
                logUserIn={this.props.logUserIn} />}

                <div >
                    <div className="placesToGo">
               <h1>Explore Places To Go!</h1>
                    <div >
                        <img src="https://www.hellomagazine.com/imagenes/travel/2018103064049/what-to-do-stay-krakow-poland-visit/0-301-905/krakow-poland-t.jpg"/>
                        <a target="_blank" className="text" href="https://www.atlasobscura.com/things-to-do/poland">Explore Poland!</a>
                    </div>
                
                    <div >
                        <img src="https://www.fodors.com/wp-content/uploads/2019/05/00_HERO_Ultimate-Argentina_shutterstock_1109339036.jpg"/>
                        <a target="_blank" className="text" href="https://www.myadventuresacrosstheworld.com/things-to-do-in-argentina/">Explore Argentina!</a>
                    </div>
                    <div >
                        <img src="https://www.roughguides.com/wp-content/uploads/2012/11/amalfi-italy-shutterstock_759048709.jpg"/>
                        <a target="_blank" className="text" href="https://www.myadventuresacrosstheworld.com/category/europe/italy/">Explore Italy!</a>
                    </div>
                    <div >
                        <img src="https://images.prop24.com/221635619"/>
                        <a target="_blank" className="text" href="https://www.myadventuresacrosstheworld.com/category/europe/portugal/">Explore Portugal!</a>
                    </div>
                    </div>
                    <div className="travelingSoon">
                    <h1>Traveling Soon?</h1>
                    <input className="searchBar"onChange={this.handleOnChange} value={this.state.search} placeholder="Search..." name="search" type="search"/>
                    
                    {this.state.indCountryClicked ?
                    <div className="countryInfo">
                    <p>
                       Name: {this.state.currentCountry.name} 
                    </p>
                    <p>
                       Capital: {this.state.currentCountry.capital} 
                    </p>
                    <p>
                      Currencies:  {currencies } 
                    </p>
                    <p>
                       Languages: {languages}
                    </p>
                    <p>
                       Timezones: {timezones}
                    </p>
                    <button className="originalButton" onClick={this.goBack}>Go back</button>
                    </div>                    
                    : filteredCountries}
                    </div>
                </div>
               
               
                
            </div>
        )
       
    }

    
}


export default HomePage
