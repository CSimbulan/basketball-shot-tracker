/*
Component for the "About" page. Just a simple description of the app and some image credits.
*/

import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact'

const About = () => {
    return (
        <>
            <MDBRow style={{ padding: 10, justifyContent: "center" }}>
                <MDBCol sm="12" md="12" lg="6">
                    <div className="list-container" style={{ height: "80vh" }}>
                        <div className="list-header  d-flex">
                            <h1 style={{ fontWeight: 500 }}>Basketball Shot Tracker</h1>
                        </div>
                        <div className="list-list" style={{ textAlign: "left", padding: 10 }}>
                            <u><h2 style={{ fontWeight: 400 }}>Summary</h2></u>
                            <p>Basketball Shot Tracker is an app for athletes to track their shots for a shooting workout.</p>
                            <p>Users can mark spots where they took shots from on a grid overlayed on a basetkball court.</p>
                            <p>Through the UI the user can add how many makes and attemps they took from a marked spot.</p>
                            <p>Once the user is finished with a workout they can save it to the database and view or edit it later in the profile page.</p>
                            <p>The profile page will also contain analytics, which will show trends in the user's shooting percentages over time.</p>
                            <p>Court image is from <a href="https://www.vecteezy.com/free-vector/basketball">Basketball Vectors by Vecteezy.</a></p>
                            <p>Basketball icon made by           <a
                                href="https://www.flaticon.com/authors/dinosoftlabs"
                                title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>.</p>
                        </div>
                    </div>
                </MDBCol>
            </MDBRow>
        </>
    );
}

export default About;