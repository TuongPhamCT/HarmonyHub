import './TextButton.css';

export const TextButton = (props) => {
    const style = {
        color: props.color,
        borderColor: props.borderColor,
        backgroundColor: props.backgroundColor,
        width: props.width,
        height: props.height,
        fontSize: props.fontSize
    };

    return (
        <div className={"txt_button text-button"} onClick={props.onClick}
            style={style}>
            {props.text || null}
        </div>
    );
}