import './RequestPage.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RequestForm from '../RequestForm/RequestForm';

function Request () {
    const user = useSelector(store => store.user)

    return(
        <>
            <center><h3> Create new request</h3></center>
        <RequestForm />
        <Link to="/userS"><button className="btn cancelBtn">cancel</button></Link>
        </>
    )

}

export default Request