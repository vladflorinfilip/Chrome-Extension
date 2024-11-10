# Vlad's Extension

## Table of Contents
- [About](#about)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgments](#acknowledgments)

## About
Vlad's Extension is a Chrome extension designed to manage outstanding and completed tasks effectively. The extension fetches data from a server application running on port 4444 and displays the tasks in a user-friendly interface.

## Prerequisites
Ensure the following software is installed:
- Google Chrome Browser
- Node.js (for running the server)

## Installation
Step-by-step instructions to set up the extension:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/extension-to-do.git
    cd extension-to-do
    ```

2. **Load the extension in Chrome:**
    - Open Chrome and go to `chrome://extensions/`.
    - Enable Developer mode.
    - Click on "Load unpacked" and select the `vlads-extension` directory.

3. **Install application:**
    - Navigate to repository `https://github.com/vladlumfilip/to_do_list`
    - Download the master or feature-226982
    
4. **Install dependencies:**
    ```sh
    npm install
    npm use 20 # Use version 20 of node
    ```

5. **Run the application:**
    ```sh
    npm run dev
    ```

6. **Create a configuration file**
    You need to create a config.json file in the main directory of the extension. 
    This needs to contain the links to the application, the task APIs and the port number:
    ```sh
    {
    "port": "<your_port_number>",
    "url": "<URL of main application tab>",
    "apis": ["<URL oustanding API>","<URL completed API>"]
    }   
    ```

## Usage
Once the extension is installed and the server is running, you can use the extension to see your outstanding and completed tasks. This can be done in a the to do list tab but also the categories tab. This code allows you to check and remove tasks from the extension just like you would from the application itself. This means you can edit tasks from the category page.