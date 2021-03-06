import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText, CardMenu } from 'react-mdl'
import { User } from '../../controllers/User'

class ProfileInfos extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			pictureUrl: null
		}
		this.userController = new User()
	}
	
	componentDidMount() {
		this.userController.getPictureUrl()
			.then(res => {
				if(res.code && res.code === "storage/object-not-found") {
					this.setState({loaded: true})
				} else {
					this.setState({pictureUrl:res, loaded: true})
				}
				
			})
			.catch((error) => {
				switch (error.code) {
					case 'storage/object_not_found':
						console.log("File does not exists")
						this.setState({loaded: true})
						break;
					case 'storage/unauthorized':
						console.log("Unauthorized")
						break;
					default:
						break;
				}
			})
	}
	
	getStyle = () => {
		return this.state.pictureUrl !== null
		?{
				color: '#fff',
				height: '300px',
				background: `url(${this.state.pictureUrl}) center / cover`
			}
		:{
				color: 'black',
				height: '70px',
			}
	}
	
	render() {
		if (!this.state.loaded) return null
		const { user } = this.props
		return (
			<Card shadow={0} style={{width: '400px',minHeight:'0', margin: 'auto'}}>
				<CardTitle style={this.getStyle()}>
					<div>
						{user.profile.firstName} {user.profile.lastName}
					</div>
				</CardTitle>
				<CardText>
					<div>
						{user.profile.phone}
					</div>
				</CardText>
				<CardMenu >
					<Link to="/editProfile">
						<i style={{color: 'blue'}} className="material-icons">mode_edit</i>
					</Link>
				</CardMenu>
			</Card>
		)
	}
}

export default ProfileInfos
ProfileInfos.propTypes = {
	user: PropTypes.object
}