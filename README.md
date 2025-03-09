# GSynergy Typescript React Challenge – Progressive Web App

## Overview

This project is a Progressive Web App (PWA) developed as part of the GSynergy Typescript React Challenge. The app allows users to manage and analyze data related to stores, SKUs, and planning metrics. It includes multiple pages for adding, updating, and reordering stores and SKUs, as well as a planning page with an AG-Grid for data entry and calculations. The app is deployed on Vercel with a CI/CD pipeline for automatic deployment.

## Live Demo

You can access the deployed application here:  
[GSynergy App](https://gs-050325-jay-pratap-bhadoriya.vercel.app/)

## GitHub Repository

The source code for this project is available on GitHub:  
[GitHub Repo](https://github.com/JayPratapBhadoriya/gs-050325-jay-pratap-bhadoriya)

---

## Features Implemented

1. **Navigation Bar**:

   - A top navigation bar with the GSynergy logo on the left.
   - A left navigation menu with icons and labels for each screen.

2. **Stores Page**:

   - Allows adding, removing, updating, and reordering stores.

3. **SKUs Page**:

   - Allows adding, removing, and updating SKUs along with their prices and costs.

4. **Planning Page**:

   - Displays an AG-Grid with a cross-join of Stores and SKUs along the rows and Calendar along the columns.
   - Includes columns for Sales Units, Sales Dollars, GM Dollars, and GM %.
   - Conditional formatting for GM % based on predefined rules.

5. **Responsive Design**:

   - The app is designed to be responsive with a minimum width of 1080 pixels.

6. **Deployment**:

   - The app is deployed on Vercel with a CI/CD pipeline that automatically deploys changes when code is pushed to the `main` branch.

7. **Authentcation**:
   - Implement Authentication using Firebase

---

## What I Did Well

1. **Code Structure and Reusability**:

   - The code is structured into reusable components, making it maintainable and scalable.
   - Used TypeScript for type safety and better developer experience.

2. **State Management**:

   - Implemented state management using Redux for managing Stores, SKUs data, Calender data, and Plans Data.

3. **AG-Grid Integration**:

   - Successfully integrated AG-Grid for multiple pages with dynamic data binding and conditional formatting.

4. **Pre populating AG grid Data**:

   - Successfully Prepopulated Stores and SKUs data from the Excel and rendered on the UI.

5. **Chart Page**:

   - Implement the optional Chart page to visualize GM Dollars and GM % using a dual-axis bar chart.
   - Use a charting library like Recharts or AG-Charts for this purpose.

6. **Error Logging**:

   - Add logging for errors and warnings to improve debugging and monitoring in production.

7. **CI/CD Pipeline**:

   - Set up a CI/CD pipeline using Vercel for automatic deployment, ensuring seamless updates.

8. **Authentcation**:

   - Added authentication with help of firebase

9. **Responsive**:
   - App is responsive for all screen sizes.

---

## What I Would Improve with More Time

1. **Jest Test Cases**:

   - Write unit tests using Jest to ensure the reliability of components and state management logic.
   - Test-driven development (TDD) would improve code quality and reduce bugs.

2. **Calculation Logic on Planning Page**:

   - Complete the calculation logic for Sales Dollars, GM Dollars, and GM % on the Planning page.
   - Ensure the calculations are accurate and dynamically update based on user input.

---

## How to Run the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/JayPratapBhadoriya/gs-050325-jay-pratap-bhadoriya.git
   ```
   - Then Run following commands:
     - cd gs-050325-jay-pratap-bhadoriya
     - npm install
     - npm run dev
