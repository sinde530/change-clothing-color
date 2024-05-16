import { useState, useRef } from 'react';
import './App.css';

// import T1Image from './assets/top/polo shirt.webp';

function App() {
  const [color, setColor] = useState('#FFFFFF');
  const [imageSrc, setImageSrc] = useState('');
  const canvasRef = useRef(null);

  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!imageSrc) return;

    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imageSrc;
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
        {imageSrc && (
          <>
            <img src={imageSrc} alt="Uploaded" className="clothing-image" />
            <div
              className="color-overlay"
              style={{
                backgroundColor: color,
                maskImage: `url(${imageSrc})`,
              }}
            />
          </>
        )}
      </div>
      <div>
        <label>
          컬러 지정:
          <input type="color" onChange={handleColorChange} value={color} />
        </label>
      </div>
      <div className="upload-button">
        <label>
          이미지 업로드:
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </label>
      </div>
      <button onClick={handleDownload} disabled={!imageSrc}>
        이미지 다운로드
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}

export default App;
