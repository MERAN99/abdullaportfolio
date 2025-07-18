# Education ID Card Texture Generator

This feature allows you to customize the ID card texture in the Education section of your portfolio to display your education information.

## How to Use

1. Navigate to the Education section of your portfolio.
2. Click on the "Customize Lanyard Texture" button.
3. This will open the texture generator page where you can customize:
   - University name
   - Degree title
   - Graduation year
   - Student ID
   - Major
   - Department
   - Background colors (top and bottom gradient)
   - Text color
   - Accent color
4. As you make changes, you'll see a live preview of your texture.
5. When you're satisfied with the design, click "Generate & Download Texture".
6. The texture will be downloaded as "education-lanyard.png".
7. Move this file to the `public/models/` directory in your project.
8. The lanyard component will automatically use your new texture on the ID card.

## Technical Details

The lanyard component is configured to look for a file named `education-lanyard.png` in the `public/models/` directory. If this file is not found, it will fall back to the default ID card texture.

### Manual Access

You can also access the texture generator directly by navigating to:

```
http://localhost:5173/generate-texture
```

(Replace with your actual development server URL)

## Customization Options

- **University**: Your university name (e.g., "UNIVERSITY OF SULAYMANIYAH")
- **Degree**: Your degree title (e.g., "BACHELOR OF COMPUTER SCIENCE")
- **Graduation Year**: Your graduation year
- **Student ID**: Your student ID number
- **Major**: Your major field of study
- **Department**: Your department name
- **Top Color**: The top color of the background gradient
- **Bottom Color**: The bottom color of the background gradient
- **Text Color**: The color of the text on the ID card
- **Accent Color**: The color used for decorative elements

## Implementation Details

The texture generator uses HTML Canvas to create a PNG image that is applied to the 3D ID card mesh in the Education section. The lanyard and ID card are implemented using Three.js with React Three Fiber and physics with @react-three/rapier.

## Quick Setup

To quickly create a default ID card texture, run:

```bash
npm run create-texture
```

This will generate a default ID card texture with sample education information. 