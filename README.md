# React Based Youtube Clone

[![Author Vedharaj](https://img.shields.io/badge/Author-Vedharaj-d62828)](https://www.linkedin.com/in/ebaneshar-vedharaj-422566214)

### Introduction
A YouTube clone React project is like building a simplified version of YouTube using the React JavaScript library. It involves creating components for features like video playback and search videos. By mimicking YouTube's interface and functionality, you learn how to manage state, handle user interactions, fetch data from APIs, and style components to resemble the original platform. It's a great way to practice React skills.

### Technologies Used
- React

### Installation
To run the application locally, follow these steps:

1. Clone the repository from GitHub:

   ```
   git clone https://github.com/Vedharaj/youtube-clone.git
   ```

2. Navigate into the project directory:

   ```
   cd youtube-clone
   ```

3. Start the server:

   ```
   nom install
   npm run dev
   ```

7. Open your browser and visit `http://localhost:5173` to view the application.

### Folder Structure
- `public`: Conatins html file
- `src`: Contain all jsx files
    - `asserts`: Svg for icons
    - `components`: Contain reusable elements
    - `pages`: Contains pages
    - `store`: State management of redux
    -  `utils`: To manage parse data

### Dependencies
- `React`
- `@reduxjs/toolkit`: State management more efficient 
- `react-router-dom`: Routing library for React applications
- `tailwindcss`: Utility-first CSS framework
- `axios`: To handle request and response
- `react-icons`: Provides a collection of popular icon packs
- `react-infinite-scroll-component`: Which helps to infinite scroll videos

### Components
- `Card`: For each videos of home page.
- `Navbar`: Contains search box and others
- `SearchCard`: For each videos of Seach Results
- `Sidebar`: To navigate others pages
- `Spinner`: Shows progress of data fetch
- `WatchCard`: Videos watching container

### Pages
- `Home`: Main Page
- `Search`: Shows search results page
- `Watch`: Video Watch page

### YouTube Data API v3
The YouTube Data API v3 allows developers to access and interact with YouTube's features and data in this applications
#### How to use this API:
1. `Set Up a Project`: Create a new project in the Google Cloud Console.
2. `Turn on YouTube Data API v3`: Enable this API for your project. It allows your app to interact with YouTube.
3. `Get Credentials`: Create an API key to authenticate your app with the YouTube API.
4. `Use the API Key`: Insert this key into your app's code. It lets your app make requests to the YouTube API to fetch data like video information.
5. `Make Requests`: With the API key in place, your app can send requests to the YouTube API to get the data you need, like video details or search results.

### Configuration
- Create a `.env` file in the project directory with the following variables:
  ```
  VITE_YOUTUBE_DATA_API_KEY1=<your_youtube_api>
  ```
### Conclusion
Thank you for using our Youtube Clone React application! We hope you enjoy this game.
