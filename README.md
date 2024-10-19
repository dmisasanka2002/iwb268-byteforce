## install devDependencies

cd backend -> bal build
cd admin -> npm run dev
cd frontend -> npm run dev

## Before Run

Create a "Config.toml" file in backend directory.
Add folowing data to the coonfig.toml file.

    defalt_admin = <Your default admin email>
    password = <Your admin password>
    frontUrl = <Your frontend URL ex: "http://localhost:5174" >
    adminUrl = <Your admin URL ex: "http://localhost:5173" >

## To run

Run the following commands in root directory.

    1. npm install
    2. npm run start-all
