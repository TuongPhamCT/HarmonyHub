import './ToggleButton.css';

export const ToggleButton = (props) => {
    const activeStyle = {
        color: "white",
        borderColor: props.activeColor,
        backgroundColor: props.activeColor,
        width: props.width,
        height: props.height,
        fontSize: props.fontSize
    };

    const deactiveStyle = {
        color: props.color,
        borderColor: props.color,
        backgroundColor: "transparent",
        width: props.width,
        height: props.height,
        fontSize: props.fontSize
    };

    return (
        <div className={"txt_button toggle-button"} onClick={props.onClick}
            style={props.active ? activeStyle : deactiveStyle}>
            {props.text || null}
        </div>
    );
}