# Contact Management System

## Project Description

The Contact Management System helps users track important contact information of customers and clients. It allows users to add, view, update, and delete contact details all in one place. This system is designed to help businesses manage relationships by providing an easy way to maintain and access contact information. 

With this system, users can:
- Add new contacts with key information (e.g., name, email, phone number, company, job title).
- View contacts in a sortable and paginated table.
- Edit contact details to keep information up-to-date.
- Delete contacts that are outdated or duplicates.

## Key Features

- **Add a New Contact**: Users can add contacts with essential details like name, email, phone number, company, and job title.
- **View Contacts**: A sortable table lists all contacts with pagination for easy browsing.
- **Edit Contact Information**: Users can update contact details as needed (e.g., phone number, company).
- **Delete a Contact**: Allows users to remove outdated or duplicate entries to keep the contact list clean.

## Tech Stack

- **Frontend**: React.js, MUI
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (>= v14)
- [MongoDB](https://www.mongodb.com/try/download/community) or a cloud database service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Steps to Run the Project Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/HemantKr071/Contacts-Management.git

2. **Navigate to the backend folder**:

   ```bash
   cd backend
3. **Install the required dependencies**:

   ```bash
   npm install

4. **Set up environment variables**:
   Create a **.env** file in the backend directory and add the following content:
   ```bash
   MONGO_URL=mongodb://localhost:27017/
5. **Start the backend server**:
   ```bash
   npm start
The server will run on http://localhost:3000
 
 
 **Frontend Setup**:
   
1. **Navigate to the frontend folder**:
   ```bash
   cd ../frontend
2. **Install the required dependencies**:
   ```bash
   npm install
3. **Start the Frontend**:
   ```bash
   npm run dev
The frontend application will run on http://localhost:5173

# Challenges and Solution

1. **Understanding and Implementing MUI Table:**
   - Struggled with customizing MUI Table for sorting, pagination, and dynamic data updates.
   - **Solution:** Studied MUI documentation and used `useEffect` and `useState` for table updates.

2. **Integrating API with Frontend for CRUD Operations:**
   - Difficulty in establishing smooth communication between frontend and backend for data operations (Create, Read, Update, Delete).
   - **Solution:** Used Axios for API calls, handled asynchronous operations, and ensured proper error handling.

3. **Managing Form Input State:**
   - Issues with managing state for form inputs while adding or editing contacts.
   - **Solution:** Used `useState` hook for form data, conditional rendering for Add/Edit modes.

4. **Updating UI Post-API Response:**
   - Ensuring UI updates without page reload after adding/editing/deleting data.
   - **Solution:** Triggered data re-fetching and state updates using `useEffect` and React state.

5. **Data Persistence and Error Handling:**
   - Ensured data integrity between frontend and backend and handled edge cases.
   - **Solution:** Implemented validation and error messages on both frontend and backend.

6. **Conditional Rendering for Edit/Delete Operations:**
   - Handling dynamic UI changes based on add/edit mode and delete confirmations.
   - **Solution:** Managed conditional rendering with state and added confirmation modals for delete.

7. **Handling Asynchronous Operations and Loading States:**
   - Managing loading states while waiting for API responses.
   - **Solution:** Created loading state using `useState` to show feedback during data operations.

8. **Dealing with CORS Issues:**
   - Faced CORS issues when making requests between frontend and backend.
   - **Solution:** Added `cors` middleware to backend to allow cross-origin requests.


  



   

