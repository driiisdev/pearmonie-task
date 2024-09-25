# Pearmonie Task  Server Application

The backend application for the Pearmonie Task Application.

It is written using the following stack:

| Section   	          | Solution   	    | Description        |
|----------------------|-----------------|--------------------|
| Runtime   	          | NodeJS     	    ||
| Language  	          | JavaScript 	    ||
| Framework 	          | Express    	    ||
| Database  	          | PostgreSQL    	    ||
| Storage      	       | ??         	    | Depends on hosting |
| Documentation      	 | JSDoc         	 |  |

For requirements, see `dependencies` and `devDependencies` in `package.json`

## Folder Structure
    .
    ├── model                       # Class representations of database tables
    |── services                    # Model sorted services
    ├── middleware                  # Model sorted middleware
    ├── controller                  # Model sorted functions
    ├── utils                       # Utility functions
    ├── routes                      # Model sorted Endpoints
    └── README.md

## Installation 
After cloning to the repo, run `npm install` to install all libraries and dependencies.
Run `npm run dev` to start the application with `Nodemon`. Run `npm run jsdoc` to generate static HTML documentation website. 
