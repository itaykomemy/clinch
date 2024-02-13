import './theme-editor.css';
import { useContext } from 'react';
import ThemeContext from '../ThemeContext';


const createChangeFunction = (name, onChange) => {
    return e => onChange(name, e.target.value);
}

const ThemeEditor = ({ onChange }) => {

    const theme = useContext(ThemeContext);

    return (
        <div className='theme-editor'>
            <div className='title'>Change Theme</div>

            <div className='editor-row'>
                <div>Even Rows:</div>
                <div className='editor-column'>
                    <div className='editor-pair'>
                        <label>Color</label>
                        <input
                            style={{ backgroundColor: theme.EvenRowsColor }}
                            onChange={createChangeFunction('EvenRowsColor', onChange)}
                            value={theme.EvenRowsColor} />
                    </div>
                    <div className='editor-pair'>
                        <label>Background color</label>
                        <input
                            style={{ backgroundColor: theme.EvenRowsBgColor }}
                            onChange={createChangeFunction('EvenRowsBgColor', onChange)}
                            value={theme.EvenRowsBgColor} />
                    </div>
                </div>
            </div>

            <div className='editor-row'>
                <div>Odd Rows:</div>
                <div>
                    <div className='editor-pair'>
                        <label>Color</label>
                        <input
                            style={{ backgroundColor: theme.OddRowsColor }}
                            onChange={createChangeFunction('OddRowsColor', onChange)}
                            value={theme.OddRowsColor} />
                    </div>
                    <div className='editor-pair'>
                        <label>Background color</label>
                        <input
                            style={{ backgroundColor: theme.OddRowsBgColor }}
                            onChange={createChangeFunction('OddRowsBgColor', onChange)}
                            value={theme.OddRowsBgColor} />
                    </div>
                </div>
            </div>

            <div className='editor-row'>
                <div>Even Cell Values:</div>
                <div>
                    <div className='editor-pair'>
                        <label>Color</label>
                        <input
                            style={{ backgroundColor: theme.EvenCellValuesColor }}
                            onChange={createChangeFunction('EvenCellValuesColor', onChange)}
                            value={theme.EvenCellValuesColor} />
                    </div>
                    <div className='editor-pair'>
                        <label>Background color</label>
                        <input
                            style={{ backgroundColor: theme.EvenCellValuesBgColor }}
                            onChange={createChangeFunction('EvenCellValuesBgColor', onChange)}
                            value={theme.EvenCellValuesBgColor} />
                    </div>
                </div>
            </div>

            <div className='editor-row'>
                <div>Odd Cell Values:</div>
                <div>
                    <div className='editor-pair'>
                        <label>Color</label>
                        <input
                            style={{ backgroundColor: theme.OddCellValuesColor }}
                            onChange={createChangeFunction('OddCellValuesColor', onChange)}
                            value={theme.OddCellValuesColor} />
                    </div>
                    <div className='editor-pair'>
                        <label>Background color</label>
                        <input
                            style={{ backgroundColor: theme.OddCellValuesBgColor }}
                            onChange={createChangeFunction('OddCellValuesBgColor', onChange)}
                            value={theme.OddCellValuesBgColor} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ThemeEditor;
