import './App.css';
import React, { useReducer, useRef } from 'react';


/**Defines the useReducer first param
 * which is a function 
 * It's defined outside the functional component 
 * because it won't need any specific data
 * defined in the App component function
 * @param prevState the previous state
 * @param action the action that will trigger the dispatch function
 * @returns the new state
 */
const reducerItem = (prevState, action) => {
  switch (action.type) {
    case 'ADD_ACTION':
      return [...prevState, action.addedItem];
    case 'DELETE_ACTION':
      return prevState.filter((item) => item.name !== action.deletedItemName);
    default:
      return prevState;
  }
};

const App = () => {
  const inputRef = useRef();
  /**Manages the state of the Items 
   * which are an array of all our items
   * each Item has an id and a name
   */
  const [items, dispatchItems] = useReducer(reducerItem, []);

  const addItemToCart = (event) => {

    event.preventDefault();
    /**The action will be an object of 2 fields
     * the type of action
     * the value of the input
     * inputRef.current.value: simply the value 
     * of the input that has a ref= inputRef
     */
    dispatchItems({ type: 'ADD_ACTION', addedItem: { id: Math.random().toString(), name: inputRef.current.value } });

    /**Resets the input */
    inputRef.current.value = '';
  }
  const deleteItemFromCart = (event) => {
    event.preventDefault();

    /**The action will be an object of 2 fields
     * the type of action
     * the Item to be deleted, which is simply 
     * an object with one field: name   
     */
    dispatchItems({ type: 'DELETE_ACTION', deletedItemName: inputRef.current.value });

    /**Resets the input */
    inputRef.current.value = '';
  }

  return (
    <div >
      <form >
        <label>Write the item</label>
        <input
          ref={inputRef}
          type='text'>
        </input>
        <button type='submit' onClick={addItemToCart}>Add</button>
        <button type='submit' onClick={deleteItemFromCart}>Delete</button>
      </form>
      <div>
        <ul>
          {items.map((item) =>
            <li key={item.id}>{item.name}</li>)}
        </ul></div>
    </div>
  );
}

export default App;
