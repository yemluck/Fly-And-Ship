import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';


function DefaultPage () {
    const history = useHistory();

   
    // this function redirects user to the flyer's page
    const onSelectFlyer = () => {
        console.log('in onSelectFlyer');
        history.push("/LandingPageF")
    }

    // this function redirects user to the shipper's page
    const onSelectShipper = () => {
        console.log('in onSelectShipper');
        
        history.push("/LandingPageS")
    }

    return(
        <>
         <Container sx={{maxWidth: 1000, marginTop: 15}}>
        
         <h1> Ready to save money?</h1>
            <h3> Frequent flyers, ready to cut down on the price of expensive air tickets? <br></br>
                Make money shipping directly for clients to subsidize air fare...<br></br>


                Need instant shipment with guaranteed delivery? Try out our service ...</h3>

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" size="large" onClick={onSelectFlyer}> Flyer </Button>

                    <Button variant="contained" size="large" onClick={onSelectShipper}> shipper </Button>
                </Stack>

                

                <p>or <Link to="/login">login</Link> to an existing account</p>


        </Container>
        </>
    )
}

export default DefaultPage;