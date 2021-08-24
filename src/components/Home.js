import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap';
const server = process.env.REACT.Server_URL;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrFlower: [],
    };
  }
  componentDidMount = async (req, res) => {
    const { user } = this.props.auth0;
    await axios
      .get(`${process.env.REACT_APP_SERVER}/flowerslist?email=${user.email}`)
      .then((response) => {
        this.setState({
          arrFlower: response.data,
        });
      });
  };
  addToFavorite(item) {
    const { user } = this.props.auth0;
    const reqbody = {
      name: item.name,
      photo: item.photo,
      instructions:item.instructions,
      email: user.email
    };
    axios.post(`${process.env.REACT_APP_SERVER}/favorite`, reqbody);
    console.log(reqbody);
  }
  render() {
    return (
      
    <div>
        {this.state.arrDrink.map((item) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`${item.photo}`} />
              <Card.Body>
                <Card.Title>{`${item.name}`}</Card.Title>
                <Card.Text>{`${item.instructions}`}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => this.addToFavorite(item)}
                >
                  Add to Favorite
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withAuth0 (Home);
