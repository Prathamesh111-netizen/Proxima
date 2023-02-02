import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../../components/Navbar";
import Waves from "../../components/Waves/waves";
// import getRoomCode from "./getRoomCode.js";

export default function CreateMeeting() {
  const navigate = useNavigate();
  const JoinMeeting = () => {
    navigate(`/meeting/${uuidv4()}`);
  };

  return (
    <div>
      <Waves />
      <Navbar />

      {/*A page where users can join a meeting*/}
      {/*A meeting preview page where users can see theor face*/}
      {/*A page where users can see the meeting*/}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl">Create a Meeting</h1>
        <button
          onClick={JoinMeeting}
          className="bg-purple-600 text-white p-3 rounded mt-5"
        >
          Create
        </button>

        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl">Join a Meeting</h1>
          <input
            type="text"
            placeholder="Enter Meeting ID"
            defaultValue={JoinMeeting}
            className="border-2 border-purple-600 p-2 rounded mt-5"
          />
          <button
            onClick={JoinMeeting}
            className="bg-purple-600 text-white p-3 rounded mt-5"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

/*
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Build And Deploy

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:

    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          # Upload entire repository
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1

*/
