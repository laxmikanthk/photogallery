import React from 'react';
import Button from "@material-ui/core/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Row, Input, Card, CardHeader, CardBody } from "reactstrap";
import { CREATEANNOTAIONAction } from "./actions";

export class Canvas extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        currentItemData:{},
          dialogOpen: false,
          filename:"",
          file: '',
          imagePreviewUrl: '',
          x1:"",
          y1:"",
          x2 :"",
          y2:""
      };
        
        this.rect = {}
        this.drag = false
  }

  componentWillReceiveProps(props){
    this.loadImage();
  }

  componentDidMount(props) {
      this.loadImage();
  }
  
  onHandleChange=e=>{
    const {name,value} = e.target;
    this.setState({
        [name]:value
      });
  }

  onhandleDraw = (e) => {
    const{currentItemData, x1,y1,x2,y2} = this.state;
    if(currentItemData)
    {
      let annotation = currentItemData.annotation;
      if(annotation && annotation.length >0)
      {
        annotation.push({
            id:annotation.length + 1,
            x1:x1,
            x2:x2,
            y1:y1,
            y2:y2
        });
        currentItemData.annotation = annotation;
      }
      else
      {
        annotation = [{
              id:0,
              x1:x1,
              x2:x2,
              y1:y1,
              y2:y2
        }];
        currentItemData.annotation = annotation;
      }

      this.setState({
        x1:"", y1:"", x2 :"", y2:""
      });
      let userdata = { fileinfo:currentItemData};
      this.props.handleDraw(userdata);
    }
  }
  
  handleChange = e => {
    this.setState({
      ...this.state,
      name: e.target.value
    });
  };

  loadImage = () =>{
    const ctx = this.refs.canvas.getContext('2d');
    var currentItemData = this.props.imageData[this.props.CurrentSelectedID == 0 ?this.props.CurrentSelectedID: this.props.CurrentSelectedID-1];
    this.setState({
      currentItemData:currentItemData
    });
    var image = new Image();
    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    if(this.props.CurrentSelectedID > -1 && this.props.CurrentSelectedID <= this.props.imageData.length){
      image.src = currentItemData.url; 
      this.refs.canvas.width = image.width;
      this.refs.canvas.height = image.height;
    }
    else{
      image.src =""
    }
      
    image.onload = function () {
        ctx.drawImage(image, 0, 0, image.width, image.height); 
        ctx.beginPath();
        ctx.strokeStyle="red";
        var rects =  currentItemData.annotation 
        for(var i=0;i<rects.length;i++) {
            ctx.strokeRect(rects[i].x1,rects[i].y1, rects[i].x2 - rects[i].x1, rects[i].y2 - rects[i].y1);
        }
        ctx.stroke();
    }
  }
  render() {
    return (
      <div>
        <div> <canvas ref="canvas" className="canvasimage" />
        </div>
        <div>
          <Card>
          <CardHeader>Add bounding box coordinates</CardHeader>
          <CardBody>
            <Row>
              <Col md={3}><Input type="text" name="x1" placeholder="X1" onChange={this.onHandleChange} /></Col>
              <Col md={3}><Input type="text" name="y1" placeholder="Y1" onChange={this.onHandleChange} /></Col>
              <Col md={3}><Input type="text" name="x2" placeholder="X2" onChange={this.onHandleChange} /></Col>
              <Col md={3}><Input type="text" name="y2" placeholder="Y2"  onChange={this.onHandleChange} /></Col>
            </Row>
          </CardBody>
        </Card>
        </div>
        <div>
          <Button onClick={this.props.handleCloseDialog} color="secondary">Close</Button>
          <Button onClick={() => this.onhandleDraw(this)}color="secondary" autoFocus>Draw</Button>
        </div>
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      CREATEANNOTAIONAction : CREATEANNOTAIONAction
    },
    dispatch
  );

const mapStateToProps = state => {
  const { imageData, CurrentSelectedID, TimeStamep } = state;
  
  return {
    imageData,
    CurrentSelectedID,
    TimeStamep
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Canvas);