import React, { Component } from "react";

export default class App extends Component {
  state = {
    pokemon: {
      results: []
    },
    pokeDetails: { name: "", powers: [], sprites: {} },
    isInfoShowing: false
  };

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = async (
    url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12"
  ) => {
    const res = await fetch(url);
    const pokes = await res.json();
    this.setState({ pokemon: pokes });
    console.log(pokes);
  };

  fetchDetails = async (name) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    ).catch((error) => console.log(error));
    const json = await res.json();
    console.log(json);
    this.setState({ pokeDetails: json });
    this.setState({ isInfoShowing: true });
  };

  previous = () => {
    if (!this.state.pokemon.previous) return;
    this.fetchPokemon(this.state.pokemon.previous);
  };

  handleClose = () => {
    this.setState({ isInfoShowing: false });
  };

  next = () => {
    if (!this.state.pokemon.next) return;
    this.fetchPokemon(this.state.pokemon.next);
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Pokemon List</h1>
        </div>

        <div id="main-content">
          {this.state.isInfoShowing ? (
            <div className="poke-card info">
              <h2>{this.state.pokeDetails.name}</h2>
              <p>{this.state.pokeDetails.powers}</p>

              <button onClick={this.handleClose}>Close</button>
            </div>
          ) : (
            <>
              <ul>
                {this.state.pokemon.results.map((poke) => (
                  <li
                    className="poke-card"
                    key={poke.name}
                    onClick={() => this.fetchDetails(poke.name)}
                  >
                    <h3>{poke.name}</h3>
                  </li>
                ))}
              </ul>

              <button id="previous" className="btn" onClick={this.previous}>
                Previous
              </button>
              <button id="next" className="btn" onClick={this.next}>
                Next
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}
