import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import UpdateForm from "./UpdateForm";
import { withAuth0 } from "@auth0/auth0-react";
class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrFav: [],
      show: false,
      email: this.props.auth0.user.email,
    };
  }

  
  componentDidMount = async (req, res) => {
    console.log(this.state.email)

    await axios
      .get(`${process.env.REACT_APP_SERVER}/favorite?email=${this.state.email}`)
      .then((response) => {
        this.setState({
          arrFav: response.data,
        });
      });
  };
  deleteFromFavorite = async (index) => {
    const { user } = this.props.auth0;

    await axios
      .delete(
        `${process.env.REACT_APP_SERVER}/favorite/${index}?email=${user.email}`
      )
      .then((response) => {
        this.setState({
          arrFav: response.data,
        });
      });
    console.log(index);
  };
  handleShow = (a, b, c,d) => {
    this.setState({
      name: b,
      photo: c,
      instructions:d,
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  updatedData = async (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    let updateopj = {
      email: this.props.auth0.user.email,
      name: e.target.name.value,
      photo: e.target.photo.value,
      instructions:e.target.instructions.value,
    };
    let response = await axios.put(
      `${process.env.REACT_APP_SERVER}/favorite/${this.state.index}`,
      updateopj
    );

    await this.setState({
      arrFav: response.data,
    });

  }
  render(){

    return(
      <div>
      {this.state.arrFav.map((item, index) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={`${item.photo}`} alt="" />
            <Card.Body>
              <Card.Title>{`${item.name}`}</Card.Title>
              <Card.Text>{`${item.instructions}`}
                </Card.Text>
              <Button
                variant="primary"
                onClick={() => this.deleteFromFavorite(index)}
              >
                Delete
              </Button>

              <Button
                variant="primary"
                onClick={() =>
                  this.handleShow(index, item.name, item.photo)
                }
              >
                Update
              </Button>
            </Card.Body>
          </Card>
        );
      })}
      {
        <UpdateForm
          handleShow={this.handleShow}
          handleClose={this.handleClose}
          photo={this.state.photo}
          name={this.state.name}
          show={this.state.show}
          updatedData={this.updatedData}
          index={this.state.index}
        />
      }
    </div>
  );
}
}

export default withAuth0(FavFlowers);
