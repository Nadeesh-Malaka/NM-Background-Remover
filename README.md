# NM Background Remover

A simple and efficient web application to remove image backgrounds instantly using the [remove.bg](https://www.remove.bg/) API. This tool allows users to upload an image, remove its background, fine-tune the result with erase and restore tools, enhance the image quality, and download the final image as a PNG with a transparent background.

![image](https://github.com/user-attachments/assets/7bbf3c4a-dd53-49ad-bef5-06052235aa2a)


## Live Demo
Check out the live site here: [https://nadeesh-malaka.github.io/NM-Background-Remover/](https://nadeesh-malaka.github.io/NM-Background-Remover/)

## Features
- **Instant Background Removal**: Remove backgrounds in seconds using the remove.bg API.
- **Fine-Tune Editing**: Use erase and restore tools with adjustable brush size to perfect the result.
- **Image Enhancement**: Enhance the image by adjusting brightness and contrast.
- **Download as PNG**: Save the edited image with a transparent background.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Privacy First**: Images are processed securely and not stored on the server.

## How It Works
1. **Upload**: Click the upload area to select an image from your device.
2. **Remove Background**: Click the "Remove Background" button to process the image.
3. **Fine-Tune**: Use the erase, restore, and enhance tools to adjust the result.
4. **Download**: Click the "Download" button to save the image as a PNG.

## Technologies Used
- **HTML5**: For the structure of the web page.
- **CSS3**: For styling and responsive design.
- **JavaScript**: For interactivity and API integration.
- **Canvas API**: For image editing (erase, restore, enhance).
- **remove.bg API**: For background removal.
- **Font Awesome**: For social media icons in the footer.

## Setup and Installation
To run this project locally:
1. Clone the repository:
   ```bash
   git clone https://github.com/nadeesh-malaka/NM-Background-Remover.git
    ```

2. Navigate to the project directory:
   ```bash
   cd NM-Background-Remover
   ```
3. Open `index.html` in a web browser:
   ```bash
   open index.html
   ```
   Alternatively, use a local server (e.g., with VS Code’s Live Server extension) for a better experience.

**Note**: You’ll need a remove.bg API key to use the background removal feature. Replace the `API_KEY` in `script.js` with your own key:
```javascript
const API_KEY = 'your-api-key-here';
```

## API Key Security
The current implementation includes the remove.bg API key in the client-side code (`script.js`). For production use, it’s recommended to move the API key to a backend server to prevent exposure. This project keeps it in the frontend for simplicity.

