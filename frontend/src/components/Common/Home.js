import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Jumbotron, Container, Button } from "react-bootstrap";

import FacebookIcon from '@material-ui/icons/Facebook';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="black">
        <Jumbotron fluid className="all">
          <Container>
            <div className="register">
              <h1 className="welcome">
                <h1 className="welcome">Welcome to Planet Of Jobs</h1>{" "}
              </h1>
              <p>
                <h6>
                  <b>
                    <i className="find">
                      <h3 className="find">find your dream job!</h3>
                    </i>
                  </b>
                </h6>
              </p>
              <Link to="/login">
                <Button
                  renderAs="button"
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                >
                  <span>Login</span>
                </Button>
              </Link>
              <hr></hr>
              <h6 className="grey-text text-darken-1">
                <p className="account">Don't have an account? </p>{" "}
                <Link to="/register">Register</Link>
              </h6>
            </div>
          </Container>
        </Jumbotron>
        <div className="first">
          <div className="first-one">
            <>
              <h1 className="title1">Reveal the strength who is in you</h1>
              <h1 className="text1">
                your next job, you have to know all your strengths! 💪
              </h1>
              <p className="title2">
                Planet Of Jobz is the only platform that transforms all your
                experiences, professional, personal, volunteer, school... into
                clear and visible skills for recruiters.
              </p>
            </>
          </div>
          </div>
          <div className="second ">
        <div className="second-one">
       <h2 className="text3">I was a cashier for several years besides my courses and I didn't mention it on my CV.
        By discovering my soft skills: time management,
        oral conception, maintenance... I understood that my experience was rich. 
        Now I put my soft skills into my applications and I'm proud to talk about it.
        <br /><br />
        <h4 className="natasha"> 'natasha romanov: student engeneer'</h4>
</h2>
<img src="https://cdn-images.welcometothejungle.com/tsNgBU0oTc-Vj-RfK74Qfi60iBa5frhRlNRtzaljcNY/rs:auto:1500::/q:85/czM6Ly93dHRqLXByb2R1Y3Rpb24vdXBsb2Fkcy92aWRlby9pbWFnZS80Mjg3LzE2MDM0NC9tdXJmeV92aWRlb18zOXllQWVtLmpwZw" className="img1" />

        </div>
 </div>

          
<div className="forth">
<div className="forth-one">
</div>
</div>
<div className="footer">
<div className="media">
  <h3 className="contact">Follow us</h3>
<img  src="https://thumbs.dreamstime.com/b/illustrations-de-vecteur-d-ic%C3%B4ne-logo-facebook-sur-le-fond-blanc-dans-les-ai-pour-la-banni%C3%A8re-web-142150097.jpg"  className="facebook"/>
 <img  src="https://img.freepik.com/vecteurs-libre/instagram-icone-nouveau_1057-2227.jpg?w=2000 " className="insta" />
 <img  src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png " className="twiti" />
 <img  src="https://thumbs.dreamstime.com/b/logo-de-youtube-illustration-vecteur-couleur-rouge-et-noire-d-appli-isolement-sur-le-fond-blanc-155631998.jpg" className="youtube"  />

</div>
 <div className="all-element">
 <div className="element-footer1 ">
 <h5 className="elemenet-footer1">Email : num54794109@gmail.com</h5>
 <h5 className="elemenet-footer1">Phone number : 54794109</h5>
 <h5 className="elemenet-footer1">about us</h5>
 
 </div>
 <div className="element-footer2">
 <h5 className="elemenet-footer2">career</h5>
 <h5 className="elemenet-footer2">palces of jobs</h5>
 <h5 className="elemenet-footer2">formation Name</h5>

 </div>
 <div className="element-footer3">
   
 <h5 className="elemenet-footer3">departement</h5>
 <h5 className="elemenet-footer3">jabs lists</h5>
 <h5 className="elemenet-footer3">jobes types</h5>

 </div>
 </div>
 </div>

      </div>
    );
  }
}
