import { useContext } from "react";
import ThemeContext from "../ThemeContext";

/* eslint-disable react/display-name */
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const Row = props => (
    <div className="sheet-row">
        {props.children}
    </div>
)

const Cell = ({ style, children }) => {
    return (
        <div style={style} className="sheet-cell">{children}</div>
    );
}

const cellColorDeterminator = (theme, value, row) => {
    const isEvenValue = value % 2 === 0;
    const isEvenRow = row % 2;

    if (theme.EvenCellValuesColor && isEvenValue) {
        return { color: theme.EvenCellValuesColor };
    }

    if (theme.OddCellValuesColor && !isEvenValue) {
        return { color: theme.OddCellValuesColor };
    }

    if (theme.EvenRowsColor && isEvenRow) {
        return { color: theme.EvenRowsColor };
    }

    if (theme.OddRowsColor && !isEvenRow) {
        return { color: theme.OddRowsColor };
    }

    return {};
}

const cellBgDeterminator = (theme, value, row) => {
    const isEvenValue = value % 2 === 0;
    const isEvenRow = row % 2;

    if (theme.EvenCellValuesBgColor && isEvenValue) {
        return { backgroundColor: theme.EvenCellValuesBgColor };
    }

    if (theme.OddCellValuesBgColor && !isEvenValue) {
        return { backgroundColor: theme.OddCellValuesBgColor };
    }

    if (theme.EvenRowsBgColor && isEvenRow) {
        return { backgroundColor: theme.EvenRowsBgColor };
    }

    if (theme.OddRowsBgColor && !isEvenRow) {
        return { backgroundColor: theme.OddRowsBgColor };
    }

    return {};
}

const staticCellStyle = {
    backgroundColor: "#aedbdb"
}

export default ({ values, title }) => {
    const theme = useContext(ThemeContext);
    const maxLength = values.reduce((l, row) => row.length > l ? row.length : l, 0)

    return <div className="sheet-view">
        <div className="sheet-title">{title}</div>
        <Row>
            {(Array(maxLength).fill(0)).map((_, i) => <Cell style={staticCellStyle} key={i}>{alphabet[i]}</Cell>)}
            <Cell style={staticCellStyle}>SUM</Cell>
        </Row>
        {values.map((row, i) => (
            <Row key={i} >
                {row.map((value, j) => {
                    const cellStyle = {
                        ...cellBgDeterminator(theme, value, i + 1),
                        ...cellColorDeterminator(theme, value, i + 1),
                    }
                    return (
                        <Cell
                            style={cellStyle}
                            key={j}>
                            {value}
                        </Cell>
                    )
                })}
                <Cell style={staticCellStyle}>{row.reduce((sum, el) => sum + el, 0)}</Cell>
            </Row>)
        )}
    </div>
}
