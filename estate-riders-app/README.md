#  Estate Riders - Electric Mobility Rentals

A modern, full-stack web application for renting electric bikes, scooters, and skates within residential estates. Built with React and a RESTful API backend.


## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



## Features

###  Core Functionality
- **User Authentication** - Secure login/signup system with role-based access
- **Vehicle Catalog** - Browse electric bikes, scooters, and skates
- **Real-time Booking** - Book vehicles with duplicate prevention
- **Admin Dashboard** - Manage vehicles, bookings, and users
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### User Roles
- **Regular Users** - Browse, search, and book vehicles
- **Administrators** - Full CRUD operations on vehicles, bookings, and user management

###  UI/UX Features
- Beautiful gradient backgrounds (emerald/teal theme)
- Smooth animations and transitions
- Toast notifications for user feedback
- Advanced search and filter capabilities
- Mobile-responsive navigation with dropdown menu
- Loading animations during data fetching

###  Advanced Features
- **Duplicate Booking Prevention** - Smart lock mechanism prevents double bookings
- **Real-time Data Sync** - Fresh data validation before each booking
- **Category Filtering** - Filter by bike, scooter, or skates
- **Search Functionality** - Search across name, type, and location
- **Session Persistence** - User sessions saved in localStorage


##  Tech Stack

### Frontend
- **React 18.x** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **LocalStorage API** - Session management

### Backend
- **JSON Server** or **Custom REST API** - Mock/real API
- **RESTful Architecture** - Standard HTTP methods

### Development Tools
- **Vite/Create React App** - Build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control


##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/estate-riders.git
   cd estate-riders
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001
   ```

4. **Start the JSON Server (Backend)**
   ```bash
   npm run server
   # or
   json-server --watch db.json --port 3001
   ```

5. **Start the React app (Frontend)**
   ```bash
   npm start
   # or
   yarn start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`


##  Project Structure

```
estate-riders/
├── public/
│   ├── images/               # Vehicle images
│   └── index.html
├── src/
│   ├── components/           # Reusable components
│   │   ├── NavBar.jsx
│   │   ├── ItemCard.jsx
│   │   ├── HireForm.jsx
│   │   ├── SearchFilter.jsx
│   │   └── AddItemForm.jsx
│   ├── pages/                # Page components
│   │   ├── LogIn.jsx
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── ItemDetails.jsx
│   │   ├── About.jsx
│   │   └── Admin.jsx
│   ├── api.js                # API utility functions
│   ├── App.jsx               # Main app component
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── db.json                   # JSON Server database
├── package.json
├── tailwind.config.js
└── README.md
```

##  API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Vehicles
- `GET /vehicles` - Get all vehicles
- `POST /vehicles` - Create new vehicle
- `GET /vehicles/:id` - Get vehicle by ID
- `PATCH /vehicles/:id` - Update vehicle
- `DELETE /vehicles/:id` - Delete vehicle

### Bookings
- `GET /bookings` - Get all bookings
- `POST /bookings` - Create new booking
- `GET /bookings/:id` - Get booking by ID
- `PATCH /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking


##  Usage

### For Regular Users

1. **Sign Up / Log In**
   - Create an account or log in with existing credentials
   - Sessions are automatically saved

2. **Browse Vehicles**
   - View all available vehicles on the home page
   - Use filters to narrow down by category (bikes, scooters, skates)
   - Search by name, type, or location

3. **Book a Vehicle**
   - Select a vehicle from the catalog
   - Choose your booking date and duration
   - Click "Book Now" to confirm
   - Receive instant confirmation via toast notification

4. **View Item Details**
   - Click on any vehicle card to see full details
   - View features, pricing, and availability
   - Book directly from the details page

### For Administrators

1. **Access Admin Dashboard**
   - Log in with admin credentials
   - Navigate to the Admin tab

2. **Manage Vehicles**
   - Add new vehicles to the fleet
   - Edit existing vehicle details
   - Delete vehicles from inventory
   - View vehicle statistics

3. **Manage Bookings**
   - View all active bookings
   - Update booking status
   - Cancel bookings if needed

4. **Manage Users**
   - View all registered users
   - Monitor user activity
   - View booking history



## Key Features Explained

### Duplicate Booking Prevention
The app uses a sophisticated locking mechanism to prevent double bookings:
- Client-side locking with `useRef` hooks
- Server-side validation with fresh data checks
- 2-3 second cooldown periods between booking attempts
- Multiple validation layers (date check, active booking check)

### Real-time Toast Notifications
- Success messages in green
- Error messages in red
- Positioned below navbar for visibility
- Auto-dismiss after 4 seconds
- Smooth fade-in/fade-out animations

### Responsive Navigation
- Desktop: Horizontal navigation bar
- Mobile: Hamburger menu with dropdown
- Auto-close on link selection
- User info displayed in mobile menu


##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic


##  Known Issues

- [ ] Mobile menu may need improvement on very small screens
- [ ] Image upload functionality pending
- [ ] Payment integration not yet implemented


##  Roadmap

- [ ] Payment gateway integration (M-Pesa, Stripe)
- [ ] Email notifications for bookings
- [ ] QR code generation for bookings
- [ ] Rating and review system
- [ ] Real-time chat support
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
- [ ] Analytics dashboard

##  License

This project is licensed under the MIT License - see the [LICENSE] file for details.



##  Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com


##  Acknowledgments

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [JSON Server](https://github.com/typicode/json-server)
- Inspiration from modern rental platforms


## Support

For support, email support@estateriders.com or join our Slack channel.

