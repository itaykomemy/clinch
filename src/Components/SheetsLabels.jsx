/* eslint-disable react/display-name */
export default ({ labels, selected, onClick }) => {
    return (
        <div className="sheets-list">
            <div className="sheet-title">Spreadsheets</div>
            {labels.map((label => {
                return (
                    <button
                        className="selectable-button"
                        key={label}
                        style={{ backgroundColor: selected.includes(label) ? "rgb(166 253 161)" : "inherit" }}
                        onClick={() => onClick(label)}>{label}</button>)
            }))}
        </div>)
}
