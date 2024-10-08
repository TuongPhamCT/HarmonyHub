import SignUp from "./components/SignUp/SignUp";
import { useRef, useState } from "react";
function App() {
  //ref for the signup modal
  const signUpRef = useRef();

  //state to check if the modal is visible
  const [isModalVisible, setIsModalVisible] = useState(false);

  //function to show the modal
  const showSignUpModal = () => {
    signUpRef.current.showModal();
    setIsModalVisible(true);
  };

  //function to hide the modal
  const hideSignUpModal = () => {
    signUpRef.current.close();
    setIsModalVisible(false);
  };

  return (
    <div
      className={`App ${isModalVisible ? "bg-black w-screen h-screen" : ""}`}
    >
      <SignUp ref={signUpRef} handleClose={hideSignUpModal} />
      <button onClick={showSignUpModal}>Show signup Form</button>
    </div>
  );
}

export default App;
