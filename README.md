# Vehicle POI Tracking System

## Overview

This repository contains the source code for a Vehicle Point of Interest (POI) Tracking System. The application is designed to calculate and display the amount of time vehicles spend within predefined Points of Interest (POIs). It provides a web interface where users can filter the data by vehicle license plate and date, and view the processed results in a tabular format.

## Features

- Responsive web interface for cross-device compatibility and accessibility.
- Retrieve vehicle position data from an external API.
- Retrieve POI data from an external API.
- Calculate the time each vehicle spends inside each POI.
- Display a table summarizing the time spent.
- Filter results based on license plate and date.
- Show a loading indicator while fetching data.
- Display a message when no data is returned after applying filters.

## Technologies Used

- Angular 13: A platform for building mobile and desktop web applications.
- RxJS: A library for reactive programming using observables.
- SCSS: Stylesheets for styling the web application.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- Angular CLI

### Installation

1. Clone the repository: `git clone https://github.com/romanostd/mobi7-dev-challenge.git`
2. Navigate to the project directory: `cd mobi7-dev-challenge`
3. Install dependencies: `npm install`

### Running the Application

1. Start the development server: `ng serve`
2. Open your browser and navigate to: `http://localhost:4200/`

## Usage

The main interface allows users to:

- Enter a vehicle's license plate number.
- Select a date to filter the position data.
- Click on the "Apply Filters" button to retrieve and display the filtered data.

