import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'
import Request from 'request';

class CreateUser extends React.Component {

  static propTypes = {
    createUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  state = {
    emailAddress: '',
    name: '',
    emailSubscription: false,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {
      console.warn('not a new user or already logged in')
      return (
        <Redirect to={{
          pathname: '/'
        }}/>
      )
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.emailAddress}
            placeholder='Email'
            onChange={(e) => this.setState({emailAddress: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <div>
            <input
              className='w-100 pa3 mv2'
              value={this.state.emailSubscription}
              type='checkbox'
              onChange={(e) => this.setState({emailSubscription: e.target.checked})}
            />
            <span>
              Subscribe to email notifications?
            </span>
          </div>

          {this.state.name &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.createUser}>Sign up</button>
          }
        </div>
      </div>
    )
  }

  createZenAccount = () => {
    // const headers = {
    //   'Content-Type': 'application/json'
    // };
    // const dataString = `{"user": {"name": ${this.state.name}, "email": ${this.state.emailAddress}, "role": "agent"}}`;

    // const options = {
    //   url: 'http://localhost:8080/api/addzendesk',
    //   method: 'POST',
    //   headers: headers,
    //   body: dataString,
    // };

    // const callback = function(error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //       console.log(body);
    //   }
    // }
    // Request(options, callback);

    let _objToSend = {};

    _objToSend["name"] = this.state.name;
    _objToSend["email"] = this.state.emailAddress;

    console.log(_objToSend);

    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "http://localhost:8080/api/addzendesk");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(_objToSend));

    this.props.history.replace('/')
  }

  createUser = () => {
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      emailAddress: this.state.emailAddress,
      name: this.state.name,
      emailSubscription: this.state.emailSubscription,
    }

    this.props.createUser({ variables })
      .then((response) => {
          //alert("successfully created a user man")
          //this.props.history.replace('/')
          this.createZenAccount();
      }).catch((e) => {
        console.error(e)
        this.props.history.replace('/')
      })
  }
}

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(CreateUser))
)
