import { Link } from 'react-router-dom';
import sadPanda from './sadPanda.jpg'
 
const ErrorPage = () => {
    return (
        <div className="notFound">
            <h1>Cannot find this link</h1>

            <div className="nfDiv">
                <img className="notFoundImg" src={sadPanda}  alt="404" />
                <Link to='/'>Go back to home</Link>
            </div>

            </div >
    );
}

export default ErrorPage;