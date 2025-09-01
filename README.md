# 🇪🇸 Para leer esto en español, visita [README.es.md](./README.es.md)
# RAID-App

RAID-App is an application for managing Risks, Actions, Issues, and Dependencies in projects.

## Features
- User authentication (register and login)
- Dashboard to view and manage risks, dependencies, issues, and assumptions
- Backend with Node.js, Express, and MongoDB
- Frontend with React and Vite

## Installation

### Requirements
- Node.js >= 18
- MongoDB Atlas or local

### Clone the repository
```bash
git clone https://github.com/imandresmorales/RAID-App.git
cd RAID-App
```

### Backend setup
1. Go to the `server` folder:
	```bash
	cd server
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Create a `.env` file with:
	```env
	MONGODB_URI=your_mongodb_uri
	PORT=3000
	SECRET=your_jwt_secret
	```
4. Start the server:
	```bash
	node index.js
	```

### Frontend setup
1. Go to the `client` folder:
	```bash
	cd ../client
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the app:
	```bash
	npm run dev
	```

## Usage
- Access `http://localhost:5173` for the frontend.
- Backend will be running at `http://localhost:3000`.

## Project structure
```
RAID-App/
├── client/        # React frontend
├── server/        # Node.js/Express backend
```

## Contributing
1. Fork the repository
2. Create a branch for your feature
3. Make a pull request

## License
MIT

