import Header from "./Header";
import Content from "./Content";
import AddItems from "./AddItems";
import SearchItem from "./SearchItem";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import apiRequests from "./apiRequests";

function App() {
  const API_URL = "http://localhost:3500/items";
  // Use states
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // use effects
  useEffect(() => {
    // GET request
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Did not recieve expected data");
        }
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  // functions

  // PATCH request
  const handleCheck = async (id) => {
    const listItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id); // the item we need
    const patchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${myItem[0].id}`;
    const result = await apiRequests(reqUrl, patchOptions);
    if (result) setFetchError(result);
  };

  // DELETE request
  const handleDelete = async (id) => {
    const newItems = items.filter((item) => {
      return item.id !== id;
    });
    setItems(newItems);

    const deleteOptions = {
      method: "DELETE",
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequests(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  // POST request
  const addItem = async (item) => {
    const newItemId = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id: newItemId, checked: false, name: item };
    const newListItems = [...items, myNewItem];
    setItems(newListItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequests(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header />
      <AddItems
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main className="main">
        {isLoading && <p className="loading-p">Loading...</p>}
        {fetchError && (
          <p className="fetch-error-p">{`Error: ${fetchError}`}</p>
        )}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) => {
              return item.name.toLowerCase().includes(search.toLowerCase());
            })}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer items={items} />
    </div>
  );
}

export default App;
