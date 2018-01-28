import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'loenko',
            userData: [],
            userRepos: [],
            perPage: 10
        };
    }

    getUserData() {
        $.ajax({
            url: `https://api.github.com/users/${this.state.username}?client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}`,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({userData: data});
            }.bind(this),
            error: function(xhr, status, error) {
                this.setState({username: null});
                alert(error);
            }.bind(this)
        })
    }

    getUserRepos() {
        $.ajax({
            url: `https://api.github.com/users/${this.state.username}/repos?perPage=${this.state.perPage}&client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}&sort=created`,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({userRepos: data});
            }.bind(this),
            error: function(xhr, status, error) {
                this.setState({username: null});
                alert(error);
            }.bind(this)
        })
    }

    handleFormSubmit(username) {
        this.setState({username: username}, function() {
            this.getUserData();
            this.getUserRepos();
        });
    }

    componentDidMount() {
        this.getUserData();
        this.getUserRepos();
    }

    render() {
        return (
            <div>
                <Search onFormSubmit={this.handleFormSubmit.bind(this)} />
                <Profile {...this.state} />
            </div>
        )
    }
}

App.propTypes = {
    clientId: PropTypes.string,
    clientSecret: PropTypes.string
}

App.defaultProps = {
    clientId: '205f5c6a92d6dcd12034',
    clientSecret: 'c1ca0d46a1bc6d467e386b2275049ec9f1a83b53'
}

export default App;