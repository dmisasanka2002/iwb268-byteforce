# 🗳️ Smart Election System

This is a smart election system built with **React** and **Ballerina**, designed to manage online elections with two distinct interfaces:

1. **Admin Dashboard** - Admins can create elections by adding voters and candidates, and set the election's time period. Voters and candidates can be added until the election begins. Once the election starts, no further additions are allowed, and results remain hidden.

   Admins add voters using their **Gmail** and **NIC number**. When a voter participates in the election, they need to log in using the **Gmail** address added by the admin and provide their NIC number to cast their vote.

   After the election ends (based on the pre-defined time period), admins can view detailed results, including:

   - 📊 A pie chart showing the percentage of total votes.
   - 📋 The percentage and number of votes received by each candidate.

   _(Currently, the system supports Gmail login only, but future upgrades will allow other email services.)_

2. **Voter Interface** - Registered voters can log in and participate in the elections during the election time window by using their NIC number and Gmail address.

## 📥 Cloning and Setting Up the Application

1. Clone the repository to your desired directory.

2. Install necessary dependencies for each part of the system:

   ```bash
   cd backend -> bal build
   cd admin -> npm install
   cd frontend -> npm install
   ```

## ⚙️ Configuration Before Running

1. Create a `Config.toml` file in the `backend` directory and add the following data:

   ```toml
   defalt_admin = "<Your default admin email>"
   password = "<Your admin password>"
   frontUrl = "<Your frontend URL e.g. 'http://localhost:5174'>"
   adminUrl = "<Your admin URL e.g. 'http://localhost:5173'>"
   ```

2. Set up Google OAuth for the frontend by creating a `.env` file and adding your **Google OAuth Client ID**.

   For detailed instructions on how to obtain a Google OAuth Client ID, refer to this article:  
   [Obtaining a Google OAuth Client ID](https://dev.to/gamith_chanuka/obtaining-a-google-oauth-client-id-2gf9).

## 🚀 Running the Application

To run the project, execute the following commands from the **root directory**:

```bash
1. npm install
2. npm run start-all
```

---

## 🖼️ Frontend Preview

![image](https://github.com/user-attachments/assets/86412ac0-bf45-400e-806b-38b4945b300d)

## 🖼️ Admin Preview

![image](https://github.com/user-attachments/assets/5597edfd-a9ef-4e13-bc97-ffe94b6c09c0)

---
