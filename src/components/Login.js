import React, { Component } from 'react';
import Avatar from '@material-ui/core/Button';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createBrowserHistory } from 'history';
import axios from 'axios';
export const history = createBrowserHistory();

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor:"#FFEBCD",
		padding:"20px",
	},
	avatar: {
		margin: theme.spacing(2),
		backgroundColor: 'white'
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progess: {
		position: 'absolute'
	}
});

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errors: [],
			loading: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if("errors" in nextProps.UI){
			if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
		}
		
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.get('http://localhost:8080/users/login', {params:userData})
			.then((response) => {
				localStorage.setItem('AuthToken', `Bearer ${response.data}`);
				this.setState({
					loading: false
				});
				localStorage.setItem('LoggedIn', 'true')
				history.push('/');
				window.location.reload();
			})
			.catch((error) => {
				this.setState({
					errors: error.response.data,
					loading: false
				});
			});
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<div style={{ 
                backgroundImage: `url("https://cdn.motocms.com/src/868x580/72100/72180-original-1200.jpg")`,
                
                backgroundposition: "center",
                backgroundrepeat: "no-repeat",
                backgroundSize: "cover",
                height:"100vh"
             }}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						User SignIn Page
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							helperText={errors.email}
							error={errors.email ? true : false}
							onChange={this.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							helperText={errors.password}
							error={errors.password ? true : false}
							onChange={this.handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}
							onClick={this.handleSubmit}
							disabled={loading || !this.state.email || !this.state.password}
						>
							Login
							{loading && <CircularProgress size={30} className={classes.progress} />}
						</Button>
						<Grid container>
							<Grid item>
								<Link href="signup" variant="body2">
									{"New User? Register"}
								</Link>
							</Grid>
						</Grid>
						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
								{errors.general}
							</Typography>
						)}
					</form>
				</div>
			</Container>
			</div>
		);
	}
}

export default withStyles(styles)(Login);
