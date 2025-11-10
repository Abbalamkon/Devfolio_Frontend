# DevFolio Frontend

Professional developer portfolio platform frontend - fully integrated with backend API.

## 📁 Project Structure

```
devfolio-frontend/
├── index.html          # Main HTML structure
├── styles.css          # All application styles
├── config.js           # Configuration & global state
├── api.js              # API service layer
├── auth.js             # Authentication logic
├── projects.js         # Projects management
├── portfolio.js        # Portfolio management
├── profile.js          # Profile management
├── messages.js         # Messaging system
├── ui.js               # UI utilities & helpers
├── app.js              # Main app initialization
└── README.md           # This file
```

## 🚀 Features

### ✅ Authentication

- Email/password login and registration
- JWT token management
- Auto-login on page refresh
- Secure token storage in localStorage

### ✅ User Management

- View and edit profile
- Update avatar and cover images
- Manage social links (GitHub, LinkedIn, Twitter)
- Bio and contact information

### ✅ Projects

- Browse all projects feed
- Create new projects
- View project details
- Filter by user
- Direct links to demos and GitHub

### ✅ Portfolio

- Professional summary
- Skills showcase
- Work experience
- Education history
- Featured projects selection

### ✅ Messaging

- Direct messaging between users
- Conversations list
- Real-time message display
- Message from project feed

## 🛠️ Setup

### 1. Backend Configuration

Ensure your backend is running at:

```
https://devfoliobackend.netlify.app/api
```

If you need to change the API URL, edit `config.js`:

```javascript
const CONFIG = {
  API_URL: "https://your-backend-url.com/api",
};
```

### 2. Local Development

**Option A: Simple HTTP Server (Python)**

```bash
python -m http.server 8000
# or
python3 -m http.server 8000
```

**Option B: Node.js HTTP Server**

```bash
npx http-server -p 8000
```

**Option C: VS Code Live Server**

- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

### 3. Access the Application

Open your browser to:

```
http://localhost:8000
```

## 📝 File Descriptions

### `index.html`

Main HTML structure with:

- Authentication pages (login/register)
- Main app layout (sidebar, content, modals)
- All form elements
- Modal dialogs

### `styles.css`

Complete styling for:

- Layout and responsive design
- Components (cards, buttons, forms)
- Authentication pages
- Profile and portfolio pages
- Messages interface
- Modals and overlays

### `config.js`

Application configuration:

- API URL
- Global state management
- Token storage helpers
- Default values

### `api.js`

API service layer with methods for:

- Authentication endpoints
- User management
- Projects CRUD
- Portfolio operations
- Messaging

### `auth.js`

Authentication logic:

- Login/register handlers
- Token management
- Auto-login on page load
- Logout functionality

### `projects.js`

Projects management:

- Fetch and display projects
- Create new projects
- Edit/delete projects
- Project feed rendering

### `portfolio.js`

Portfolio management:

- Fetch portfolio data
- Edit portfolio content
- Manage featured projects
- Skills and experience

### `profile.js`

Profile management:

- View user profiles
- Edit profile information
- Update social links
- Avatar and cover images

### `messages.js`

Messaging system:

- Conversations list
- Message thread display
- Send messages
- Real-time updates

### `ui.js`

UI utilities:

- Modal controls
- Error/success messages
- HTML escaping (XSS protection)
- Page navigation
- Loading indicators

### `app.js`

Main application:

- App initialization
- Global error handling
- Keyboard shortcuts
- Debug tools (development)

## 🔒 Security Features

1. **XSS Protection**: All user input is escaped before rendering
2. **Token Management**: JWT tokens stored securely
3. **HTTPS**: All API calls use HTTPS
4. **Input Validation**: Client-side validation on all forms
5. **CORS**: Configured for specific origins

## 🎨 Customization

### Change Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
  --primary: #2d3748;
  --accent: #4299e1;
  /* ... other colors */
}
```

### Modify API URL

Edit `config.js`:

```javascript
const CONFIG = {
  API_URL: "https://your-api-url.com/api",
};
```

### Add New Features

1. Create new module file (e.g., `feature.js`)
2. Add script tag to `index.html`
3. Use existing API service or add new methods

## 📱 Responsive Design

The application is fully responsive:

- **Desktop**: Full sidebar with text labels
- **Tablet**: Condensed sidebar, icons only
- **Mobile**: Optimized for small screens

## 🐛 Troubleshooting

### Login Not Working

- Check browser console for errors
- Verify backend API is running
- Ensure CORS is configured correctly
- Check credentials are correct

### Projects Not Loading

- Verify you're logged in
- Check network tab for API errors
- Ensure backend API is accessible

### Styles Not Loading

- Check all CSS file paths are correct
- Clear browser cache
- Verify styles.css is in same directory

### Messages Not Sending

- Verify both users exist
- Check recipient ID is correct
- Ensure you're logged in

## 🚀 Deployment

### Netlify

1. Create new site from Git
2. Set build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `/`
3. Deploy!

### Vercel

```bash
vercel --prod
```

### GitHub Pages

1. Push code to GitHub
2. Go to Settings > Pages
3. Select branch and folder
4. Save and deploy

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - feel free to use for any purpose

## 🆘 Support

If you encounter issues:

1. Check browser console for errors
2. Verify backend API is running
3. Check network requests
4. Review this README

## 🎯 Next Steps

- [ ] Add file upload for project images
- [ ] Implement real-time notifications
- [ ] Add search functionality
- [ ] Create project categories
- [ ] Add user following system
- [ ] Implement likes and comments on projects

---

Built with ❤️ for developers by developers
