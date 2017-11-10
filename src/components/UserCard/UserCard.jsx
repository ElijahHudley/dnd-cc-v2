import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export class UserCard extends Component{
  constructor(props){
    super(props);

    this.state = {
      selectedImage: 0
    };
  }

  selectedImageLeft(){
    console.log('selectedImageLeft');
    var index = this.state.selectedImage;
    index = index - 1;

    if(index <= 0){
      index = 0;
    }

    this.setState({
      selectedImage: index
    });

    this.props.setImage(index);
  }

  selectedImageRight(){
    console.log('selectedImageRight');
    var images = this.props.images;
    var index = this.state.selectedImage;
    index = index + 1;

    if(index >= images.length){
      index = images.length - 1;
    }

    this.setState({
      selectedImage: index
    });

    this.props.setImage(index);
  }


    render(){
        return (
            <div className="card card-user">
                <div className="image">
                    <img src={this.props.bgImage} alt="..."/>
                </div>
                <div className="content">
                    <div className="author">
                         <a href="#pablo">
                            <img className="avatar border-gray" src={this.props.avatar} alt="..."/>
                            <h4 className="title">
                                {this.props.name}
                                <br />
                                <small>{this.props.aliment} {this.props.charClass}</small>
                            </h4>
                        </a>
                    </div>
                    <p className="description text-center">
                        {this.props.description}
                    </p>

                    <p className="description text-center">
                    <i className="fa fa-shield" aria-hidden="true"></i>
                    &nbsp; armorClass: {this.props.armorClass}</p>

                    <p className="description text-center">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    &nbsp; initiative: {this.props.initiative}</p>

                    <p className="description text-center">
                    <i className="fa fa-fast-forward" aria-hidden="true"></i>
                    &nbsp; speed: {this.props.speed}</p>

                    <p className="description text-center">
                    <i className="fa fa-medkit" aria-hidden="true"></i>
                    &nbsp; hitPoints: {this.props.hitPoints}</p>
                </div>

                <hr />

                <div className="selectImage">
                  <button className="arrow leftArrow btn btn-fill" onClick={() => this.selectedImageLeft()}>
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>

                    <span className="counter"> {this.state.selectedImage + 1} / {this.props.images.length}</span>

                    <button className="arrow rightArrow btn btn-fill" onClick={() => this.selectedImageRight()}>
                      <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </button>
                </div>

                <hr />

                <div className="selectStats">
                  <ButtonGroup vertical block>
                    <Button>View Stats</Button>
                  </ButtonGroup>
                </div>

                <hr />

                <div className="text-center">
                    {this.props.socials}
                </div>
            </div>
        );
    }
}

export default UserCard;
