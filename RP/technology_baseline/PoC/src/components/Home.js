import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Proof of Concept (PoC)</h1>
            <h2>Introduction</h2>
            <p>This is the Proof Of Concept that the Sons Of SWE group edited for the Marvin project. It consist,
              through the use of blockchain technology, in an Uniweb demonstrator on Ethereum.
            </p>
            <h3>What&#39;s included</h3>
            <p>For this prototipation phase, the members of the team wanted to offer the following pages:</p>
              <div className="box_pages">

                <h4>Home</h4>
                <p>It is the main page (this page) and it is accessible to everyone, namely to authenticated and not authenticated
                  users. It contains the Introduction section and the exposition of what the group wants to offer as a prototype.
                </p>

                <h4>Sign up</h4>
                <p>It is the registration page, where a not authenticated user can sign up.
                He must fill in the following data fields: fiscal code and univocal code. If he is
                an Universitary member, he  must also tick the Universitary category. If his personal datas are correct,
                the user will be authenticated.
                </p>

                <h4>Login</h4> 
                <p>If the authenticated user clicks the Login link, the system automatically lead him to the Profile 
                    page. 
                </p>

                <h4>Profile</h4>
                <p>It is the personal page of the authenticated user, which contains a message about the success of the
                  sign up.
                </p>

                <h4>Insert User</h4>
                <p>It is the page where the authenticated user can insert a new one. If he is an administrator user, he can
                  add professor or student users, if he is an university user he can also insert amministrator users.
                </p>

                <h4>Logout</h4>
                <p>
                  If the authenticated user clicks the Logout link, the system will automatically push him out. 
                </p>
              </div>
            {/* </p> */}
          </div>
        </div>
      </main>
    )
  }
}

export default Home
