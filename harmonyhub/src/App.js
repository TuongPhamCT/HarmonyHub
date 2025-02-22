import { FavoriteProvider } from "./components/Contexts/FavoriteContext";
import MainPage from "./components/MainPage/MainPage";

function App() {
  // //ref for the signup modal
  // const signUpRef = useRef();

  // //state to check if the modal is visible
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // //function to show the modal
  // const showSignUpModal = () => {
  //   signUpRef.current.showModal();
  //   setIsModalVisible(true);
  // };

  // //function to hide the modal
  // const hideSignUpModal = () => {
  //   signUpRef.current.close();
  //   setIsModalVisible(false);
  // };

  return (
    <div
      // className={`App ${isModalVisible ? "bg-black w-screen h-screen" : ""}`}
      className={`App "bg-black w-screen h-screen"`}
    >
      {/* <SignUp ref={signUpRef} handleClose={hideSignUpModal} /> */}
      <FavoriteProvider>
        <MainPage />
      </FavoriteProvider>
      {/* <button onClick={showSignUpModal}>Show signup Form</button><br></br> */}
    </div>
  );
}

export default App;
