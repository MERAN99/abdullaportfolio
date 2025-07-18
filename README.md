# Abdulla Mohammed Ahmed - Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- Fully responsive design for mobile, tablet, and desktop
- Modern UI with smooth animations and transitions
- Built with React functional components and hooks
- Styled with Tailwind CSS
- Includes sections for professional summary, skills, work experience, education, and languages
- Interactive 3D elements using Three.js and React Three Fiber
- Customizable education lanyard texture

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion (for animations)
- React Icons
- Three.js and React Three Fiber (for 3D elements)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

4. Create the default education lanyard texture:
   ```bash
   npm run create-texture
   # or
   yarn create-texture
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The site will be available at `http://localhost:5173`.

### Building for Production

Build the project:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

### Deployment

You can deploy the `dist` directory to any static hosting service like:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Customization

- Update personal information in the component files
- Modify colors in the `tailwind.config.js` file
- Add or remove sections by editing the `App.jsx` file

### Customizing the Education Lanyard

The education lanyard texture can be customized in two ways:

1. **Using the Texture Generator UI:**
   - Navigate to the Education section and click "Customize Lanyard Texture"
   - Or go directly to `/generate-texture` route
   - Customize the degree, university, graduation year, and colors
   - Download the texture and place it in the `public/models/` directory

2. **Using the Script:**
   - Edit the `create-default-texture.js` file to change the content and styling
   - Run `npm run create-texture` to generate the new texture

For more details, see the [Education Lanyard Documentation](EDUCATION_LANYARD.md).

## License

This project is open source and available under the [MIT License](LICENSE).
