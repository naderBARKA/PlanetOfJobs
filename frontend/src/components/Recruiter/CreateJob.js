import React, { Component } from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import"./createjob.css"
class CreateJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdetails: [],
            recruiter: [],
            recruiterName: "",
            title: "",
            titleError: "",
            description: "",
            type: "",
            typeError: "",
            duration: -1,
            durationError: "",
            durationstr: "",
            salary: -1,
            salaryError: "",
            posmax: 1,
            appmax: 10,
            appmaxError: "",
            numpos: 0,
            numapp: 0,
            app: 0,
            address: "",
            addressError: "",
            skills: [],
            skillstr: "",
            rating: 0,
            numrate: 0,
            dateOfPost: new Date(),
            // default 100 days from now
            deadline: new Date(new Date().getTime()+(100*24*60*60*1000)),
            deadlineError: "",
        }
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

    validate = () => {
        let titleError = "";
        let typeError = "";
        let durationError = "";
        let salaryError = "";
        let addressError = "";
        let deadlineError = "";
        let appmaxError = "";

    
        if (this.state.title === "") {
          titleError = "Title cannot be blank";
        }

        if (this.state.type === "") {
            typeError = "Select type of job";
        }

        if (this.state.duration === -1) {
            durationError = "Select duration of job";
        }

        if (this.state.salary === -1) {
            salaryError = "Enter Salary";
        }
    
        if (this.state.address === "") {
            addressError = "Address cannot be blank";
        }

        if (new Date(this.state.deadline) < new Date().getTime()) {
            deadlineError = "Deadline cannot be before tomorrow";
        }

        if (this.state.appmax < this.state.posmax) {
            appmaxError = "Maximum number of applications cannot be less than maximum number of positions.";
        }
    
        if (titleError || typeError || durationError || salaryError
            || addressError || deadlineError || appmaxError) {
            this.setState({ titleError, typeError, durationError, salaryError, addressError, deadlineError, appmaxError });
            return false;
        }
    
        return true;
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        let euser = this.state;
        euser.skills = this.state.skillstr.split(',');
        if(euser.durationstr !== "")
        {
            euser.duration = parseInt(euser.durationstr);
        }
        const newJob = {
            recruiter: this.state.userdetails,
            recruiterName: this.state.userdetails.name,
            title: euser.title,
            description: euser.description,
            type: euser.type,
            duration: euser.duration,
            salary: euser.salary,
            posmax: euser.posmax,
            appmax: euser.appmax,
            numpos: euser.numpos,
            numapp: euser.numapp,
            app: euser.app,
            address: euser.address,
            skills: euser.skills,
            rating: euser.rating,
            numrate: euser.numrate,
            dateOfPost: euser.dateOfPost,
            deadline: euser.deadline
        };
        const isValid = this.validate();
        if (isValid) {
            axios
                .post('http://localhost:4001/job/add_job', newJob)
                .then(response => {
                    console.log(newJob);
                    alert("Job added successfully!");
                    // to refresh
                    this.props.history.push("/viewMyActiveJobs");
                    this.props.history.push("/viewMyActiveJobs");
                    this.props.history.goBack();
                })
                .catch(function(error) {
                    console.log(error);
                    alert("Job NOT added successfully!");
                })
        }
    };

    render() {
        const user = this.state;
        const userRole = this.state.userdetails.role;
        let AddJob;
        if(userRole === "recruiter") {
            AddJob = 
            <form noValidate onSubmit={this.onSubmit} className="form" >
               <div className="allForm">
                <div className="firstHalf">
                <div className="input-field col s12">
                    <label htmlFor="title"><h6 className="options">Title</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.title}
                        id="title"
                        type="text"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.titleError}
                    </div>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="description"><h6 className="options">Description</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.description}
                        id="description"
                        type="text"
                    />
                    {/* <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError}
                    </div> */}
                </div>
                <div className="input-field col s12">
                    <label htmlFor="skillstr"><h6 className="options">Skills</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.skillstr}
                        id="skillstr"
                        type="text"
                    />
                </div>
               
                <div className="input-field col s12">
                    <label htmlFor="salary"><h6 className="options">Salary</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.salary}
                        id="salary"
                        type="number"
                        min="-1"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.salaryError}
                    </div>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="durationstr"><h6 className="options">Duration</h6></label><br></br>
                    <select 
                        value={this.state.durationstr} 
                        onChange={this.onChange}
                        id="durationstr"
                    >
                        <option value=""> <h6 className="options">Select duration</h6></option>
                        <option value = "0" >Indefinite</option>
                        <option value="1">1 month</option>
                        <option value="2">2 months</option>
                        <option value="3">3 months</option>
                        <option value="4">4 months</option>
                        <option value="5">5 months</option>
                        <option value="6">6 months</option>
                    </select>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.durationError}
                    </div>
                </div> 
                </div>
                 <div className="half">
                <div className="input-field col s12">
                    <label htmlFor="posmax"><h6 className="options"> Max num of positions available</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.posmax}
                        id="posmax"
                        type="number"
                        min="0"
                    />
                    {/* <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError}
                    </div> */}
                </div>
                <div className="input-field col s12">
                    <label htmlFor="appmax"> <h6 className="options">Max total num applications allowed</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.appmax}
                        id="appmax"
                        type="number"
                        min="0"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.appmaxError}
                    </div>
                    </div>
                
               
                <div className="input-field col s12">
                    <label htmlFor="address"> <h6 className="options">Address</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.address}
                        id="address"
                        type="text"
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.addressError}
                    </div>
                </div> 
                <div className="input-field col s12">
                    <label htmlFor="deadline"> <h6 className="options">Deadline (default: 100 days from now)</h6></label><br></br>
                    <input
                        onChange={this.onChange}
                        value={user.deadline}
                        id="deadline"
                        type="date"
                    /> 
                    </div>
                <div className="input-field col s12">
                    <label htmlFor="type" ><h6 className="options">Type</h6></label><br></br>
                    <select 
                        value={this.state.type} 
                        onChange={this.onChange}
                        id="type"
                    >
                        <option value=""><h6 className="options">Select type</h6></option>
                        <option value="fullTime">Full-time</option>
                        <option value="partTime">Part-time</option>
                        <option value="wfh">Work from home</option>
                    </select>
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.typeError}
                    </div>
                </div> 
               
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.deadlineError}
                    </div>
               
                </div>
                </div>
                <br></br>
                <div className="buttonJob"  >
                    <button className="buttonPosition"
                        style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                        }}
                        type="submit"
                        // className="btn btn-primary btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        <h6 className="textJob">Add Job</h6>
                    </button>
                    <br></br>
                </div>
            </form>
        }
        
        return (
            <div >
                <div className="jobCard">
                    <div >
                        <Card >
                            <Card.Body>
                                <Card.Text>
                                    {AddJob}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

CreateJob.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(CreateJob);