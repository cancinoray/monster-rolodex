import { useEffect, useState, ChangeEvent } from "react";
import "./App.css";
import SearchBox from "./components/search-box/search-box.component.";
import CardList from "./components/card-list/card-list.component";

import { getData } from "./utils/data.utils";

export type Monster = {
  id: string;
  name: string;
  email: string;
};

function App() {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((response) => response.json())
    //   .then((users) => setMonsters(users))

    const fetchUsers = async () => {
      const users = await getData<Monster[]>("https://jsonplaceholder.typicode.com/users");
      setMonsters(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monster-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monster"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
