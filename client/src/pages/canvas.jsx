import { Button, TextareaAutosize } from '@mui/material';
import React, { Component, useState } from 'react';
import html2canvas from "html2canvas";

// const[name,setName] = useState("");

// console.log(name)

// const handleChange = (e) => {
//     setName(e.target.value)
// }

const style = {
  border: '1px solid gray',
  backgroundColor: 'white',
  top: "50%",
  left: "50%",
};
const saveAsImage = uri => {
    const downloadLink = document.createElement("a");
  
    if (typeof downloadLink.download === "string") {
      downloadLink.href = uri;
  
      // ファイル名
      downloadLink.download = "component.png";
  
      // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
      document.body.appendChild(downloadLink);

      console.log(downloadLink.href);
  
      // ダウンロードリンクが設定された a タグをクリック
      downloadLink.click();
  
      // Firefox 対策で追加したリンクを削除しておく
      document.body.removeChild(downloadLink);
    } else {
      window.open(uri);
    }
  }
const saveimg = () => {
    // 画像に変換する component の id を指定
    const target = document.getElementById("target-component");
    html2canvas(target).then(canvas => {
      const targetImgUri = canvas.toDataURL("img/png");
      saveAsImage(targetImgUri);
  })};



class Canvas extends Component {
    constructor() {
        super();
        this.state = { drawing: false };
      }
    
      getContext() {
        return this.refs.canvas.getContext('2d');
      }
    
      startDrawing(x, y) {
        this.setState({ drawing: true });
        const ctx = this.getContext();
        ctx.moveTo(x, y);
      }
    
      draw(x, y) {
        if (!this.state.drawing) {
          return;
        }
        const ctx = this.getContext();
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    
      endDrawing() {
        this.setState({ drawing: false });
      }
  

  render() {
    return (
        <body>
        <canvas
           ref="canvas"
           width="600px"
           height="500px"
           onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
           onMouseUp={() => this.endDrawing()}
           onMouseLeave={() => this.endDrawing()}
           onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
           style={style}
            
            id='target-component'
        />
        
        {/* <TextField onChange={handleChange} fullWidth variant='filled' placeholder='検索する' sx={{mr:2, boxShadow: '0 4px 6px rgda(0, 0, 0, 0.1)',}}/> */}
                
        <br/>

        <Button onClick={saveimg}>Save AS Image</Button>
      </body>
    );
  }
}
export default Canvas;