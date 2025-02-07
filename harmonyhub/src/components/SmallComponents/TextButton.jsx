import './TextButton.css';

export const TextButton = (props) => {
    const style = {
        color: props.color,
        borderColor: props.borderColor,
        backgroundColor: props.backgroundColor,
        width: props.width,
        height: props.height,
        fontSize: props.fontSize,
        cursor: props.disabled && props.disabled === true ? "default" : "pointer",
        filter: props.disabled && props.disabled === true ? "brightness(0.3)" : "none",
    };

    return (
        <div className={"txt_button text-button"} onClick={props.onClick}
            style={style}>
            {props.text || null}
        </div>
    );
}