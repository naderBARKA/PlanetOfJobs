import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import "./MyActiveJobs.css"


class MyActiveJobs extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            userdetails: [],
            users: [],
            applications: [],
            jobs: [],
            sortedJobs: [], 
            sortName:true, 
            showform: false,
            posmax: -1,
            appmax: -1,
            deadline: new Date(),
            editing: ""
        };
        this.deljob = this.deljob.bind(this);
        this.editJob = this.editJob.bind(this);
        this.editJobSubmit = this.editJobSubmit.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
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
        axios.get('http://localhost:4001/job/get_jobs')
            .then(response => {
                this.setState({jobs: response.data, sortedJobs:response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
        axios.get('http://localhost:4001/user/')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
        axios.get('http://localhost:4001/application/get_applications')
            .then(response => {
                this.setState({applications: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }

    deljob(id) {
        let applicationsArray = this.state.applications;
        let usersArray = this.state.users;
        axios
            .delete('http://localhost:4001/job/del_job/' + id)
            .then(response => {
                alert("Job deleted successfully.");
            })
            .catch(function(error) {
                console.log(error);
            })

        applicationsArray.filter(item => item.jobId === id && item.status === "Accepted").forEach(
            function(appli) 
            {
                const editEmployee = {
                    working: false
                }
                axios
                    .put('http://localhost:4001/user/edit_profile/' + appli.applicantId, editEmployee)
                    .then(response => {
                        console.log(editEmployee);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            })
    
        applicationsArray.filter(item => item.jobId === id).forEach(
            function(appli) 
            {
                let applicant = usersArray.filter(item => item._id === appli.applicantId)[0];
                let nnumapp = +applicant.numapp;

                if(applicant.working === false)
                {
                    nnumapp = +nnumapp - 1;
                    if(nnumapp < 0) nnumapp = 0;
                }

                const editApplicant = {
                    numapp: nnumapp
                };

                axios
                    .put('http://localhost:4001/user/edit_profile/' + appli.applicantId, editApplicant)
                    .then(response => {
                        console.log(editApplicant);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })

                const editAppli = {
                    status: "Deleted"
                }

                axios
                    .put('http://localhost:4001/application/edit_application/' + appli._id, editAppli)
                    .then(response => {
                        console.log(editAppli);
                    })
                    .catch(function(error) {
                        console.log(error);
                    })
            })

        
        // to refresh
        this.props.history.push('/viewMyActiveJobs');
        this.props.history.push('/viewMyActiveJobs');
        this.props.history.goBack();
        window.location.reload();
        
    }

    editJob(job) {
        let show = !this.state.showform;
        this.setState({ showform: show});
        this.setState({ editing: job._id });
        console.log(this.state.showform);
        this.setState({ appmax: job.appmax });
        this.setState({ posmax: job.posmax });
        if(job.deadline)
        {
            job.deadline = job.deadline.toString();
            job.deadline = job.deadline.substring(0,10);
            this.setState({ deadline: job.deadline });
        }
        // to refresh
        // this.props.history.push('/viewMyActiveJobs');
    }

    onBack() {
        let show = !this.state.showform;
        this.setState({ showform: show});
        this.setState({ editing: "" });
        
        // to refresh
        this.props.history.push('/viewMyActiveJobs');
    }

    editJobSubmit(job) {
        const idToChange = job._id;
        const ind = this.state.jobs.findIndex(x => x._id === idToChange)
        
        if(this.state.deadline)
            this.state.jobs[ind].deadline = this.state.deadline;
        if(this.state.appmax < this.state.posmax)
        {
            alert("Max. no. of applications cannot be less than the max. no. of positions.");
        }
        else
        {
            if(this.state.appmax)
                this.state.jobs[ind].appmax = this.state.appmax;
            if(this.state.posmax)
                this.state.jobs[ind].posmax = this.state.posmax;
            axios
                .put('http://localhost:4001/job/edit_job/' + idToChange, this.state.jobs[ind])
                .then(response => {
                    console.log(this.state.jobs[ind]);
                    this.setState({ editing: "" });
                })
                .catch(function(error) {
                    alert("Job couldn't be updated!");
                    console.log(error);
                })
        }
        // to refresh
        
        let show = !this.state.showform;
        this.setState({ showform: show});
        // window.location.reload();
    }


    render() 
    {
        const userRole = this.state.userdetails.role;
        const userid = this.state.userdetails._id;
        let MyActiveJobs;
        if(userRole === "recruiter") {
            MyActiveJobs =
            <div >
                <Grid container className='nav'>
                <Grid >
                    <List component="nav" aria-label="mailbox folders"  >
                       
                    < ListItem text  >
                          <p className='JobList'><h3>My Jobs Listing
                              {/* <Tooltip title="Add Job" aria-label="added" >  
                            <Link to="/addJob"><i className="material-icons "><h1 className="icon"> add</h1></i></Link>
                            </Tooltip> */}
                          </h3>
                           </p>
                          </ListItem>  
                        </List> 
                      
                    
                </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper >
                            <Table  className="allTable">
                                <TableHead>
                                    <TableRow>
                                            <TableCell><p className="titleTable" >Title</p></TableCell>
                                            <TableCell><p className="titleTable" >Date of posting</p></TableCell>
                                            <TableCell><p className="titleTable">Number of Applicants</p></TableCell>
                                            <TableCell><p className="titleTable" >Remaining Number of Positions</p></TableCell>
                                            <TableCell></TableCell> 
                                            <TableCell> <Tooltip title="Add Job" aria-label="added" >  
                            <Link to="/addJob"><i className="material-icons "><h1 className="icon"> add</h1></i></Link>
                            </Tooltip></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.filter(item => item.recruiter === userid && item.numpos < item.posmax).map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell><p className="titleTable" >{job.title}</p></TableCell>
                                            <TableCell><p className="titleTable">{job.dateOfPost.substring(0,10)}</p></TableCell>
                                            <TableCell><p className="titleTable">{job.numapp}</p></TableCell>
                                            <TableCell><p className="titleTable">{job.posmax - job.numpos}</p></TableCell>
                                            
                                                 
                            <Link
                                                 className="linkApp"
                                                    to={{
                                                       
                                                        pathname: "/appList",
                                                        state: job._id  // data array of objects
                                                        
                                                    }}
                                                    > <h5 className="view">View applications</h5></Link>
                                                   
                                                
                                            <TableCell>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="secondary"    />
                                                    <Dropdown.Menu className="dropItem">
                                                        <Dropdown.Item   >
                                                            <Tooltip title="Delete Job" aria-label="delete"  >
                                                                <button
                                                                    className="btn waves-effect waves-light hoverable blue accent-3"
                                                                    onClick={() => this.deljob(job._id)}>
                                                                    <i 
                                                                    style={{
                                                                        color: "#ff7f50",
                                                                       
                                                                        }}
                                                                        className="material-icons">delete</i>Delete 
                                                                </button> 
                                                            </Tooltip>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <Tooltip title="Edit Job" aria-label="edit">
                                                                <button
                                                                    className="btn waves-effect waves-light hoverable blue accent-3" 
                                                                    onClick={() => this.editJob(job)}>
                                                                    <i 
                                                                    style={{
                                                                        color: "#0000FF",
                                                                        }}
                                                                        className="material-icons">edit</i>Edit
                                                                </button>
                                                            </Tooltip>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                 
                                            </TableCell>
                                            <TableCell>                   
                                            <div>
                                            { !this.state.showform || this.state.editing !== job._id? 
                                                <div></div>
                                            : 
                                                <div>
                                                    <br></br>
                                                    <form noValidate onSubmit={this.onSubmit}>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="appmax"> <p className="titleTable">Maximum number of applications allowed</p></label><br></br>
                                                            <input
                                                                onChange={this.onChange}
                                                                value={this.state.appmax}
                                                                id="appmax"
                                                                type="number"
                                                                min="0"
                                                            />
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="posmax"><p className="titleTable">Maximum number of positions available</p></label><br></br>
                                                            <input
                                                                onChange={this.onChange}
                                                                value={this.state.posmax}
                                                                id="posmax"
                                                                type="number"
                                                                min="0"
                                                            />
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="deadline"><p className="titleTable">Deadline for application</p></label><br></br>
                                                            <input
                                                                onChange={this.onChange}
                                                                value={this.state.deadline}
                                                                id="deadline"
                                                                type="date"
                                                            />
                                                        </div>
                                                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                                        <button
                                                        style={{
                                                            color: "coral",
                                                            }}
                                                            className="btn btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                            onClick={() => this.onBack()}>
                                                            <b  >Back</b>
                                                        </button>
                                                        <button
                                                        style={{
                                                            color: "#009900",
                                                            }}
                                                            className="btn btn-sm waves-effect waves-light hoverable blue accent-3" 
                                                            onClick={() => this.editJobSubmit(job)}>
                                                            <b>Save</b>
                                                        </button>
                                                        </div>
                                                    </form>
                                                </div>  
                                            }
                                            </div>
                                            </TableCell>
                                        </TableRow> 
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        }
        return (
            <div>
                <div className="activeCard">
                    <div >
                        <Card style={{ width: '100%' }}>
                            <Card.Body>
                                <Card.Text>
                                    {MyActiveJobs}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

MyActiveJobs.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(MyActiveJobs);