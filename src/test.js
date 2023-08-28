export default class App extends Component {
  state = {
    pokeList: { results: [] }
  };

  fetchPokemon = async () => {
    const res = fetch("https://pokeapi.co/api/v2/pokemon");
    const pokes = await res.json;
  };

  getInfo = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit12"
    ).catch((err) => {
      console.log("problem getting info: ", err);
    });
    return await response.json();
  };

  componentDidMount() {
    this.getInfo().then((data) => {
      this.setState({ pokeList: data });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <img
            className="header-logo"
            src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pokedex.png"
            alt="pokedex logo"
          />
          <h1>Pok&eacute;dex</h1>
        </div>

        <div id="main-content">
          <ul>
            {this.state.pokeList.map((poke) => (
              <li className="poke-card" key={poke.name}>
                <h3>{poke.name}</h3>
              </li>
            ))}
          </ul>

          <button id="previous" className="btn">
            Previous
          </button>
          <button id="next" className="btn">
            Next
          </button>
        </div>

        <img
          id="pikachu"
          className="hvr-hang"
          src="https://raw.githubusercontent.com/CodeLouisville/FSJS-Weekly-Challenges/master/Challenges/Week5/images/pikachu.png"
          alt="Pikachu"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
