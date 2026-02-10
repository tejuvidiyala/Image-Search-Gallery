🖼️ Image Search Gallery

A modern, responsive Image Search Gallery built using HTML, CSS, and JavaScript, powered by the Unsplash API.
The application supports real-time image search, infinite scrolling, modal previews, dark mode, and more.
🚀 Features
🔍 Real-time Image Search using Unsplash API
🔄 Infinite Scroll (automatic pagination)
🖼️ Modal Image Preview with safe preloading
❌ Close modal via X / background click / ESC key
🌙 Dark Mode Toggle
🕘 Search History (saved using LocalStorage)
⏳ Skeleton Loader for smooth UX
🎯 Image Filters (orientation & color)
💾 LocalStorage integration
📱 Responsive Design


🛠️ Technologies Used
HTML5
CSS3
JavaScript (ES6+)
Unsplash REST API

PROJECT STRUCTURE

Image-Search-Gallery/
│
├── index.html
├── style.css
├── script.js
└── README.md


⚙️ How It Works
User enters a search term and presses Enter
App fetches images from the Unsplash API
Images are displayed in a responsive grid
Scrolling loads more images automatically
Clicking an image opens a full-screen modal preview
Search history and theme preference are stored locally



🔑 API Setup
This project uses the Unsplash API.
Steps:
Create an Unsplash Developer account
Generate an Access Key
Replace the key in script.js:
const ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";


⚠️ Note: Only the Access Key is used on the client side.
The Secret Key is never exposed.


**🧪 Future Enhancements
❤️ Favorite images gallery
⬇️ Image download tracking
📱 PWA support
⚛️ React version**


🙌 Acknowledgements
Unsplash— for providing free high-quality images
Unsplash Developers API Documentation


