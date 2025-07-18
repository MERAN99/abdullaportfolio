import fs from 'fs';
import { createCanvas } from 'canvas';

// Create canvas with ID card proportions (2:3 ratio)
const canvas = createCanvas(600, 900);
const ctx = canvas.getContext('2d');

// Set background color - blue gradient
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#1a237e');  // Dark blue at top
gradient.addColorStop(1, '#3949ab');  // Lighter blue at bottom
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add a border
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 20;
ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

// Add university name
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 60px Arial';
ctx.textAlign = 'center';
ctx.fillText('UNIVERSITY', canvas.width / 2, 120);
ctx.fillText('OF', canvas.width / 2, 190);
ctx.fillText('SULAYMANIYAH', canvas.width / 2, 260);

// Add a divider
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 6;
ctx.beginPath();
ctx.moveTo(60, 300);
ctx.lineTo(canvas.width - 60, 300);
ctx.stroke();

// Add degree title
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 50px Arial';
ctx.fillText('BACHELOR OF', canvas.width / 2, 400);
ctx.fillText('COMPUTER', canvas.width / 2, 460);
ctx.fillText('SCIENCE', canvas.width / 2, 520);

// Add graduation year
ctx.font = 'bold 40px Arial';
ctx.fillText('Class of 2024', canvas.width / 2, 600);

// Add student info
ctx.font = 'bold 30px Arial';
ctx.textAlign = 'center';
ctx.fillText('Student ID: CS-2024-001', canvas.width / 2, 700);
ctx.fillText('Department: Engineering', canvas.width / 2, 750);

// Add graduation cap icon at the bottom
ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.moveTo(canvas.width / 2 - 50, 830);
ctx.lineTo(canvas.width / 2 + 50, 830);
ctx.lineTo(canvas.width / 2, 780);
ctx.closePath();
ctx.fill();
ctx.fillRect(canvas.width / 2 - 30, 830, 60, 15);

// Save the image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./public/models/education-lanyard.png', buffer);

console.log('Education ID card texture created at public/models/education-lanyard.png'); 