import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col,Row, Input, Card, CardHeader, CardBody } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { CREATEANNOTAIONAction, UPLOADIMAGEAction, SAVE_SELECTED_IMG_ID_Action } from "./actions";
import Canvas from './canvas'

class PhotoGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen : false,
      loading: true,
      imageStr:"",
      imgExt:"",
      filename:"",
      file: '',
      imagePreviewUrl: '',
      x1:"",
      y1:"",
      x2 :"",
      y2:""
    };
  }

  renderImage=(item)=> {
    return (
      <div key={item.id}>
        <img key={item.id}
          src={item.url}
          onLoad={this.handleImageChange}
          onError={this.handleImageChange}
          onClick={()=>this.OnGalaryImageClick(item)}
          className="galleryImage"
        />
      </div>
    );
  }

  OnGalaryImageClick =(item) =>{
    this.props.SAVE_SELECTED_IMG_ID_Action(item.id.toString());
    this.handleOpenDialog();

  }

  handleImageChange = () => {
    this.setState({
      loading: !imagesLoaded(this.galleryElement)
    });
  };

  _handleImageChange = (e) =>{
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let filename = e.target.files[0].name;
    reader.onloadend = () => {
      this.setState({
        filename: filename,
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  _handleCancel=(e)=>{
    this.setState({
      imagePreviewUrl: "",
      filename:"",
      x1:"", y1:"", x2 :"", y2:""
    });
  }

  handleOpenDialog = () => {
    this.setState({
        dialogOpen: true
    });
  };

  handleCloseDialog = () => {
      this.setState({
          dialogOpen: false
      });
  };

  _handleSubmit=(e)=> {
    e.preventDefault();
    const{file,filename, imagePreviewUrl,x1,y1,x2,y2 } = this.state;
    const{imageData} = this.props;
    //&& x1 && y1 && x2 && y2
    if(file && imagePreviewUrl)
    {
      let userdata = { fileinfo:{
            id: imageData.length + 1,
            url:imagePreviewUrl,
            name: filename,
            annotation:[{
              id:0, x1:x1, x2:x2, y1:y1, y2:y2
          }]
          },
          
      }
      this.setState({
        imagePreviewUrl: "",
        filename:"",
        x1:"", y1:"", x2 :"", y2:""
      });
        this.props.UPLOADIMAGEAction(userdata);
    }
    else
    {
        alert("Error please fill all");
    }        
  }

  handleDraw=e=>{
    const {name,value} = e.target;
    this.setState({
        [name]:value
      });
  }

  handleSaveDraw=e=>{
    this.props.CREATEANNOTAIONAction(e);
  }

  onHandleChange=e=>{
    const {name,value} = e.target;
    this.setState({
        [name]:value
      });
  }

  render() {
    const{imageData} = this.props;
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
        $imagePreview = (<img className="imgPreview" src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for upload</div>);
      }
    return (
      <div style={{width:'100%'}}>
        <div
          className="gallery"
          ref={element => {
            this.galleryElement = element;
          }}
        >
          <div className="images">
            { imageData.map(item => this.renderImage(item))}
          </div>
          
          <div>
            < Dialog open={this.state.dialogOpen}
                    onClose={this.handleCloseDialog} fullScreen >
                <DialogContent>
                  <div>
                <Canvas handleCloseDialog={this.handleCloseDialog}  handleDraw={this.handleSaveDraw}/>
                </div>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
          </div>
        </div>
        <div style={{height:'150px',width:'100%', maxWidth:'350px'}} >
          <div style={{borderStyle: "groove", width: '100%', height:'150px'}} >
            <form onSubmit={(e)=>this._handleSubmit(e)}>
              <input className="fileInput" 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
              
            </form>
            <div>
              {$imagePreview}
            </div>
          </div>
          <div style={{borderStyle: "groove", width:'100%', height:'136px'}} className={this.state.imagePreviewUrl ? '' : 'hidden'}>
              <div>
                <div > 
                    <CardHeader>Add bounding box coordinates</CardHeader>
                    <CardBody>
                      <Row>
                        <Col md={3}>
                          
                            <Input
                              type="text"
                              name="x1"
                              placeholder="X1"
                              onChange={this.onHandleChange}
                            />
                          
                        </Col>
                        <Col md={3}>
                              <Input
                                type="text"
                                name="y1"
                                placeholder="Y1"
                                onChange={this.onHandleChange}
                              />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                            <Input
                              type="text"
                              name="x2"
                              placeholder="X2"
                              onChange={this.onHandleChange}
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                              type="text"
                              name="y2"
                              placeholder="Y2"
                              onChange={this.onHandleChange}
                            />
                        </Col>
                      </Row>
                        </CardBody>
                </div>
            </div>
            </div>
          <div style={{alignSelf:'center'}} className={this.state.imagePreviewUrl ? '' : 'hidden'}>
                <button className={this.state.imagePreviewUrl ? 'submitButton' : 'hidden'} 
                    onClick={(e)=>this._handleCancel(e)}>Cancel</button>
                <button className={this.state.imagePreviewUrl ? 'submitButton' : 'hidden'} 
                    type="submit" 
                    onClick={(e)=>this._handleSubmit(e)}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}

function imagesLoaded(parentNode) {
  const imgElements = [...parentNode.querySelectorAll("img")];
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i];
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

const mapStateToProps = (state,ownProps) => {
  const { imageData , TimeStamep } = state;
  return {
    imageData,
    TimeStamep
  };
};

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      CREATEANNOTAIONAction : CREATEANNOTAIONAction,
      UPLOADIMAGEAction : UPLOADIMAGEAction,
        SAVE_SELECTED_IMG_ID_Action : SAVE_SELECTED_IMG_ID_Action
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(PhotoGallery);
