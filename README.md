
# Texting App (Real Time Chat)


### Required Software (Download Link)
* [Git](https://git-scm.com/downloads)
* [MS SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
* [.Net Sdk](https://dotnet.microsoft.com/download)
* [SQL Server Management Studio 2019](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
* [Visual studio 2019](https://visualstudio.microsoft.com/downloads/)
* [Nodejs](https://nodejs.org/en/)
* [Angular CLI](https://github.com/angular/angular-cli)
* [Visual studio code](https://visualstudio.microsoft.com/downloads/)

##### Cloning the project on local machine
* Open command prompt or terminal on a directory.
* Run command `git clone https://github.com/tamim36/TextingApp.git` on the terminal to clone the project on that directory.

### Backend Setup
This project was generated with Asp.NET 5 . (C#)
* Open `TextingAppBackend/TextingApp.sln` sln on visual studio.

###### Edit DB Connection String
* Go to TextingAppBackend => TextingApp directory, open appsettings.json file.
* Find this section- 
`"ConnectionStrings": {
    "TextingAppDB": "Server=<Server_name>;Database=TextingApp;Trusted_Connection=True;MultipleActiveResultSets=True;"
  },`
* Enter database server name in the place of `<server_name>`.
Ther server name can be found on sql server management studio.

###### Importing database
* Click on `textingAppDb.sql` on the toolbar of Sql server management studio. This will open a new script window.
* Copy the script of `script.sql` file (inside TextingAppBackend directory) on the script window.
* Now click on `Execute query`. This will create the database for the project.

### How to run the project with visual studio
* To start the project double click and run the `TextingApp.sln` file with visual studio .
* Run the project with IISExpress by clicking on the IISExpress button on the toolbar of visual studio.

### Frontend Setup

This project was generated with Angular cli  version 10.0.1.
###### Installing packages
* Open the TextingAppFr project with VS code.
* Click on terminal on the top toolbar
* A terminal will open on the bottom side of VS code. Run command `npm install` on terminal to install the packages. (This may take some time).

###### Run the project on Development server

*After the package has been installed run `npm start` or `ng serve` on the terminal to run the project on a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/) on your browser.
* It needs to run both TextingAppBackend and TextingAppFr project at the same time to make the project functional.

###### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.