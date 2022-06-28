import React, { Component } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Dash.css";
import {Link} from "react-router-dom"
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            userdetails: [], 
        };
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        const { user } = this.props.auth;
        axios.get('http://localhost:4001/user/'+ user.id)
             .then(response => {
                 this.setState({userdetails: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        const { user } = this.props.auth;
        let UserOptions;
        if(this.state.userdetails.role === "applicant")
        {
            UserOptions = 
            <ul>
                <li><a href="/profile">My Profile</a></li>
                <li><a href="/jobsList">View Jobs</a></li>
                <li><a href="/myApplications">My Applications</a></li>
                <button 
                            style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="logout btn btn-primary btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
                        </button>
            </ul>
        }
        else if(this.state.userdetails.role === "recruiter")
        {
            UserOptions = 
            <ul className="menu">
                <li ><Link  to="/profile"><h5 className="list">My Profile</h5></Link></li>
                <li><a href="/addJob"><h5 className="list">Add Job</h5></a></li>
                <li><a href="/viewMyActiveJobs"><h5 className="list">My Job Listings</h5></a></li>
                <li><a href="/employees"><h5 className="list">Employees</h5></a></li>
                <button 
                            style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="logout btn btn-primary btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
                        </button>
            </ul>
        }
        return (
            <div className="allDash" >
                <div className="dashCard">
                    <div >
                        
                        <h6>
                            
                        </h6>
                        <Card style={{ width: '100%' }}>
                            <Card.Header className="dashHeader">
                                <h4 className="listHeader">
                                    <b >Hey {user.name.split(" ")[0]} !</b>
                                </h4>
                            </Card.Header >
                            <Card.Body className="dashBody">
                                <Card.Title>
                                    <p className="logged">
                                    You are logged into {" "}
                                    <span style={{ fontFamily: "monospace" }}><b>JobsPlanet</b></span>
                                    </p>
                                
                                </Card.Title>
                                <Card.Text>
                                    {UserOptions}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                       
                     
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);