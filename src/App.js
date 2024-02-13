import Modal from "./Components/Modal";
import SheetView from "./Components/SheetView";
import SheetsLablesSelection from "./Components/SheetsLabels";
import ThemeEditor from "./Components/ThemeEditor";
import ThemeContext from "./ThemeContext";
import "./styles.css";
import { useEffect, useState, useReducer } from "react";


/*
{"Sheet 1":[[1,2,3],[4,5,6],[7,8,9]],"Sheet 2":[[1,2],[10,5]],"Sheet 3":[[1],[5],[10],[20],[30]]}
*/

const dataUrl =
  "https://clinch-public-documents.s3.amazonaws.com/clinch-recruitment/spreadsheet.json";

const initialState = {
  selected: [],
  theme: {
    EvenRowsColor: '',
    EvenRowsBgColor: '',
    OddRowsColor: '',
    OddRowsBgColor: '',
    EvenCellValuesColor: '',
    EvenCellValuesBgColor: '',
    OddCellValuesColor: '',
    OddCellValuesBgColor: '',
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SHEET": {
      const selected = state.selected;
      if (selected.includes(action.data)) {
        return { ...state, selected: selected.filter(l => l !== action.data) };
      } else {
        return { ...state, selected: [...selected, action.data] };
      }
    }
    case "CHANGE_THEME": {
      const oldtheme = state.theme;
      const name = action.name;
      const value = action.data;
      return { ...state, theme: { ...oldtheme, [name]: value } };
    }
  }
  return state;
}

export default function App() {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(dataUrl)
      .then(data => data.json())
      .then(data => setData(JSON.parse(data)));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const labels = Object.keys(data);
  const sheets = labels.filter(l => state.selected.includes(l));

  const changeThemeButtonStyle = { 
    marginTop: '50px',
    backgroundColor: modalOpen ? '#aedbdb' : 'inherit',
  };

  return (
    <div className="App">
      <ThemeContext.Provider value={state.theme}>
        <div className="left-menu">
          <SheetsLablesSelection
            labels={labels}
            selected={state.selected}
            onClick={
              (sheet) => { dispatch({ type: "TOGGLE_SHEET", data: sheet }) }
            } />
          <button className="selectable-button" style={changeThemeButtonStyle} onClick={() => { setModalOpen(true) }}>Change theme</button>
        </div>

        <div className="sheets-container">
          {sheets.length ?
            sheets.map(
              sheet => {
                return <SheetView
                  title={sheet}
                  key={sheet}
                  values={data[sheet]}
                />
              })
            : <div>No sheets selected</div> }
        </div>
        <Modal open={modalOpen} close={() => setModalOpen(false)}>
          <ThemeEditor onChange={(name, value) => {
            dispatch({
              type: "CHANGE_THEME", name, data: value
            })
          }} />
        </Modal>
      </ThemeContext.Provider>
    </div>
  );
}
