

# Skin Cancer Detection Web App

## Overview

Welcome to the Skin Cancer Detection Web App! This application leverages advanced technologies to provide users with an effective and user-friendly platform for detecting skin cancer. The system uses machine learning models and APIs to analyze skin images and provide diagnostic insights.

### Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **PostgreSQL**: Open-source relational database system for storing user and application data.
- **APIs**: For integrating external services and models for skin cancer detection.

### Team Members

- **Sheldon David Taylor**
- **Hajeera Suhani**
- **Sufiya Salam**

### Instructor

- **Dr. Agughasi Victor Ikechukwu**: The instructor who directed and guided the students through this project.

## Features

- **Image Upload**: Users can upload images of skin lesions for analysis.
- **Skin Cancer Detection**: The application uses a machine learning model to analyze images and predict the likelihood of skin cancer.
- **Results Visualization**: Users receive a graphical representation of the analysis results, including confidence scores.
- **Health Checkup**: Provides additional health check-up options and resources.
- **Skin Analysis**: Offers detailed skin analysis and recommendations.

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: Make sure PostgreSQL is installed and running on your machine.

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/skin-cancer-detection-webapp.git
   cd skin-cancer-detection-webapp
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup PostgreSQL**

   Create a new database and user in PostgreSQL. Replace `your_db_name`, `your_db_user`, and `your_db_password` with your own values:

   ```sql
   CREATE DATABASE your_db_name;
   CREATE USER your_db_user WITH ENCRYPTED PASSWORD 'your_db_password';
   GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;
   ```

4. **Create a `.env` File**

   Create a `.env` file in the root directory of the project and add your database connection details:

   ```env
   DATABASE_URL=postgres://your_db_user:your_db_password@localhost:5432/your_db_name
   ```

5. **Run Migrations**

   Apply database migrations to set up the initial schema:

   ```bash
   npm run migrate
   ```

6. **Start the Application**

   Launch the web app with the following command:

   ```bash
   npm start
   ```

## Database Schema

Create the initial database schema with the following SQL command:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,  -- Adjusted length to accommodate bcrypt hashes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

### Access the Web App

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

### Upload an Image

1. Go to the upload section and select an image of a skin lesion.
2. Submit the image for analysis.

### View Results

The application will display the results, including:

- A graphical representation
- Confidence scores
- Additional health check-up options
- Skin analysis recommendations

## API Integration

The web app integrates with external APIs for skin cancer detection and analysis. Ensure that API keys and endpoints are properly configured in your `.env` file if required by the external services.

## Contributing

We welcome contributions to improve the Skin Cancer Detection Web App. If you have any suggestions, bug fixes, or new features, please feel free to submit a pull request.

### How to Contribute

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request with a clear description of the changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or issues, please contact the team members:

- **Sheldon David Taylor**: sheldondavidtaylor6@gmail.com
- **Sufiya Salam**: sufiyasalam1912@gmail.com
- **Hajeera Suhani**: hajirashariff25@gmail.com

### Instructor

- **Dr. Agughasi Victor Ikechukwu**: victora@mitmysore.in

