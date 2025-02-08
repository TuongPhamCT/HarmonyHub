export const TransparentBackground = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 9000,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        pointerEvents: "none"
      }}
    ></div>
  );
}