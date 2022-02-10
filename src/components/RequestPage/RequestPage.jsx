import './RequestPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RequestForm from '../RequestForm/RequestForm';

function Request () {
    const user = useSelector(store => store.user)

    return(
        <>
        <h1> this is the  create request page </h1>
        <h3> Welcome {user.first_name} </h3>
        <h4> You are a : {user.type} </h4>
        <RequestForm />
        <Link to="/userS"><button>cancel</button></Link>
        </>
    )

}

export default Request