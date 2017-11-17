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
      let abilities =  Object.keys(this.props.charClass.savingThrows).map((item, i) => {
        return (<span data-index={i} key={i} title={"Details: " + item} value="select"> {item} </span>)
      });
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
                                <small>{this.props.race} / {this.props.aliment} / {this.props.charClass.name}</small>
                            </h4>
                        </a>
                    </div>
                    <p className="description text-center">
                        {this.props.description}
                    </p>

                    <p className="description text-center">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    &nbsp; Proficency Bonus: {'+'+this.props.proficencyBonus}</p>

                    <p className="description text-center">
                    <i className="fa fa-shield" aria-hidden="true"></i>
                    &nbsp; Armor Class: {this.props.armorClass}</p>

                    <p className="description text-center">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    &nbsp; Initiative: {this.props.initiative}</p>

                    <p className="description text-center">
                    <i className="fa fa-fast-forward" aria-hidden="true"></i>
                    &nbsp; Speed: {this.props.speed}</p>

                    <p className="description text-center">
                    <i className="fa fa-medkit" aria-hidden="true"></i>
                    &nbsp; Hit Points: {this.props.hitPoints}</p>

                    <p className="description text-center">
                    <i className="fa fa-circle" aria-hidden="true"></i>
                    &nbsp; Abilities: {abilities}</p>

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

                <div className="text-center">
                    {this.props.socials}
                </div>
            </div>
        );
    }
}

export default UserCard;
