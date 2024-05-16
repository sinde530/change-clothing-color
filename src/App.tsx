import { useState, useRef } from 'react';
import './App.css';
import T1Image from './assets/top/sweetshirts.webp';
// import T1Image from './assets/top/polo shirt.webp';

function App() {
  const [color, setColor] = useState('#FFFFFF');
  const canvasRef = useRef(null);

  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  };

  const handleDownload = () => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = T1Image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);

      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'destination-atop';
      ctx.drawImage(img, 0, 0);

      ctx.globalCompositeOperation = 'source-over';

      const link = document.createElement('a');
      link.download = 'image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <div className="App">
      <div className="image-container">
        <img src={T1Image} alt="Pants" className="clothing-image" />
        <div className="color-overlay" style={{ backgroundColor: color }} />
      </div>
      <div>
        <label>
          Choose Color:
          <input type="color" onChange={handleColorChange} value={color} />
        </label>
      </div>
      <button onClick={handleDownload}>Download Image</button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default App;
