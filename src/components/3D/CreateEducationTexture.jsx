import React, { useRef, useEffect, useState } from 'react';

const CreateEducationTexture = () => {
  const canvasRef = useRef(null);
  const [university, setUniversity] = useState('UNIVERSITY OF SULAYMANIYAH');
  const [degree, setDegree] = useState('BACHELOR OF COMPUTER SCIENCE');
  const [graduationYear, setGraduationYear] = useState('2024');
  const [studentId, setStudentId] = useState('CS-2024-001');
  const [department, setDepartment] = useState('Engineering');
  const [backgroundColor1, setBackgroundColor1] = useState('#1a237e');
  const [backgroundColor2, setBackgroundColor2] = useState('#3949ab');
  const [textColor, setTextColor] = useState('#ffffff');
  
  const updateCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions with ID card proportions (2:3 ratio)
    canvas.width = 600;
    canvas.height = 900;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background color - blue gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, backgroundColor1);  // Dark blue at top
    gradient.addColorStop(1, backgroundColor2);  // Lighter blue at bottom
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add a border
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 20;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    
    // Add university name
    ctx.fillStyle = textColor;
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    
    // Split university name into parts
    const uniParts = university.split(' OF ');
    if (uniParts.length > 1) {
      ctx.fillText('UNIVERSITY', canvas.width / 2, 120);
      ctx.fillText('OF', canvas.width / 2, 190);
      ctx.fillText(uniParts[1], canvas.width / 2, 260);
    } else {
      // If no "OF" in the name, split into multiple lines if needed
      const words = university.split(' ');
      if (words.length > 2) {
        const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
        const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');
        ctx.fillText(firstLine, canvas.width / 2, 120);
        ctx.fillText(secondLine, canvas.width / 2, 190);
      } else {
        ctx.fillText(university, canvas.width / 2, 150);
      }
    }
    
    // Add a divider
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(60, 300);
    ctx.lineTo(canvas.width - 60, 300);
    ctx.stroke();
    
    // Add degree title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 50px Arial';
    
    // Split degree into parts
    const degreeParts = degree.split(' OF ');
    if (degreeParts.length > 1) {
      ctx.fillText(degreeParts[0] + ' OF', canvas.width / 2, 400);
      
      // Check if second part needs to be split
      const secondPart = degreeParts[1];
      if (secondPart.length > 10) {
        const words = secondPart.split(' ');
        if (words.length > 1) {
          ctx.fillText(words[0], canvas.width / 2, 460);
          ctx.fillText(words.slice(1).join(' '), canvas.width / 2, 520);
        } else {
          ctx.fillText(secondPart, canvas.width / 2, 460);
        }
      } else {
        ctx.fillText(secondPart, canvas.width / 2, 460);
      }
    } else {
      // If no "OF" in the degree, split into multiple lines
      const words = degree.split(' ');
      if (words.length > 2) {
        const firstLine = words.slice(0, Math.ceil(words.length / 3)).join(' ');
        const secondLine = words.slice(Math.ceil(words.length / 3), Math.ceil(words.length * 2/3)).join(' ');
        const thirdLine = words.slice(Math.ceil(words.length * 2/3)).join(' ');
        
        ctx.fillText(firstLine, canvas.width / 2, 400);
        ctx.fillText(secondLine, canvas.width / 2, 460);
        ctx.fillText(thirdLine, canvas.width / 2, 520);
      } else if (words.length === 2) {
        ctx.fillText(words[0], canvas.width / 2, 400);
        ctx.fillText(words[1], canvas.width / 2, 460);
      } else {
        ctx.fillText(degree, canvas.width / 2, 430);
      }
    }
    
    // Add graduation year
    ctx.font = 'bold 40px Arial';
    ctx.fillText(`Class of ${graduationYear}`, canvas.width / 2, 600);
    
    // Add student info
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Student ID: ${studentId}`, canvas.width / 2, 700);
    ctx.fillText(`Department: ${department}`, canvas.width / 2, 750);
    
    // Add graduation cap icon at the bottom
    ctx.fillStyle = textColor;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 50, 830);
    ctx.lineTo(canvas.width / 2 + 50, 830);
    ctx.lineTo(canvas.width / 2, 780);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(canvas.width / 2 - 30, 830, 60, 15);
  };
  
  const generateTexture = () => {
    updateCanvas();
    
    // Download link
    const downloadLink = document.createElement('a');
    downloadLink.href = canvasRef.current.toDataURL('image/png');
    downloadLink.download = 'education-lanyard.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  // Update canvas whenever any state changes
  useEffect(() => {
    updateCanvas();
  }, [university, degree, graduationYear, studentId, department, 
      backgroundColor1, backgroundColor2, textColor]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-bold mb-2">Preview</h3>
        <div className="flex justify-center">
          <canvas 
            ref={canvasRef} 
            className="border rounded"
            style={{ height: '450px', width: '300px' }}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Degree</label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Graduation Year</label>
            <input
              type="text"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Top Color</label>
            <input
              type="color"
              value={backgroundColor1}
              onChange={(e) => setBackgroundColor1(e.target.value)}
              className="w-full p-1 border rounded h-10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Bottom Color</label>
            <input
              type="color"
              value={backgroundColor2}
              onChange={(e) => setBackgroundColor2(e.target.value)}
              className="w-full p-1 border rounded h-10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Text Color</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full p-1 border rounded h-10"
            />
          </div>
        </div>
        
        <button
          onClick={generateTexture}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Generate & Download Texture
        </button>
      </div>
    </div>
  );
};

export default CreateEducationTexture; 