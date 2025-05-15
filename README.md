# Feedback Dashboard

A RESTful API built with **Node.js**, **Express**, and **MongoDB** to manage user feedback with sentiment analysis integration. This project helps streamline the collection, categorization, and analysis of feedback for better decision-making.

## 🚀 Features

- Create, Read, Update, and Delete (CRUD) feedback entries.
- Analyze sentiment of feedback using the `sentiment` package.
- Categorize feedback by:
  - Priority: Low, Medium, High, Critical
  - Status: New, In Progress, Resolved, Closed
  - Type: Bug, Feature, Improvement, Question
- Timestamps for `createdAt` and `updatedAt`.

## 📦 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Sentiment Analysis:** sentiment npm package

## 🧠 Sentiment Analysis

Every submitted feedback is analyzed for sentiment score using [Sentiment](https://www.npmjs.com/package/sentiment), which helps determine user emotion (positive/negative/neutral).

## 📂 Folder Structure

project-root/
├── models/
│ └── Feedback.js
├── routes/
│ └── feedback.js
├── .gitignore
├── server.js
└── README.md

csharp
Copy
Edit

## 📷 Screenshots

You can add your screenshots here:

assets/
├── form-view.png
└── dashboard-view.png

sql
Copy
Edit

To show them in README:
```md
![Form View](assets/form-view.png)
📦 Getting Started
Clone the repository:

bash
Copy
Edit
git clone https://github.com/pooja8955/feedback-dashboard.git
cd feedback-dashboard
Install dependencies:

bash
Copy
Edit
npm install
Create .env file for MongoDB connection:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
Start the server:

bash
Copy
Edit
npm run dev
API will run on http://localhost:5000/api/feedback

📬 API Endpoints
Method	Endpoint	Description
GET	/api/feedback	Get all feedback entries
GET	/api/feedback/:id	Get a specific feedback
POST	/api/feedback	Create new feedback
PATCH	/api/feedback/:id	Update feedback by ID
DELETE	/api/feedback/:id	Delete feedback by ID

🛡️ License
This project is licensed under the MIT License.
