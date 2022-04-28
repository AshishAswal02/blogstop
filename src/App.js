import Navbar from "./Navbar";
import Home from "./Home";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>



      <div className="app">
        <Navbar />
        <div className="content">
        <Home/>
        </div>
      </div>


       
    </ErrorBoundary>
  );
}

function ErrorHandler({ error }) {

  // console.dir(error);
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export default App;
