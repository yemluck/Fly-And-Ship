import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <center>
      <div style={{maxWidth: 800}}>
        <h2> About Fly&Ship</h2><br></br>
        <h3>Technologies used</h3>
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" 
            height="40px" width="40px" /></a><a href="https://www.heroku.com/">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/heroku/heroku-original.svg" 
              height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" 
                height="40px" width="40px" /></a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
                  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
                  height="40px" width="40px" /></a><a href="https://jquery.com/">
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jquery/jquery-original.svg"
                     height="40px" width="40px" /></a><a href="https://material-ui.com/">
                       <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" 
                       height="40px" width="40px" /></a><a href="https://nodejs.org/en/">
                         <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" 
                         height="40px" width="40px" /></a><a href="https://www.postgresql.org/">
                           <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"
                            height="40px" width="40px" /></a><a href="https://reactjs.org/">
                              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" 
                              height="40px" width="40px" /></a><a href="https://redux.js.org/">
                                <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg"
                                 height="40px" width="40px" />
            </a>
            <p><b> React.js, javascript, HTML, CSS, Passport.js, Multer for picture upload, Postgresql</b></p><br></br>
            {/* <ul>
              <li>React.js</li>
              <li>javascript</li>
              <li>Html & CSS</li>
              <li>passport.js</li>
              <li>multer for picture upload</li>
              <li>PostGreSql</li>
            </ul><br></br> */}
            <h3> Challenges </h3>
            <p>Sql filter and date data manipulation</p><br></br>
            <h3> Future development to tackle</h3>
            <p>Introduction of Map API for distance filtering</p>
            <h3> Appreciation </h3>
          <p>I acknowledge my Prime Woodall cohort, my instructor, my pod mates and everyone
             who contributed to the success of this project</p>
      
      </div>
      </center>
    </div>
  );
}

export default AboutPage;
