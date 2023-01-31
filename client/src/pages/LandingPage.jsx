//Landing Page
import React from "react";
import { Link } from "react-router-dom";
import demoGif from "../assets/demo.gif";
import Navbar from "../components/Navbar";
// import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  //   const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="lg:h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="slogan ml-5 lg:mt-24">
          <h1 className="text-3xl">Code without worrying about privacy</h1>
          {/* <hr /> */}
          <h1 className="text-3xl">Meet without worrying about privacy</h1>
          {/* <hr /> */}
          <h1 className="text-3xl">
            Collaborate without worrying about privacy
          </h1>
          <h2 className="mt-4 subtitle">
            <hr />
            <p className="">
              Say hello to One click decentralised Live Code Collaboration
            </p>
          </h2>
          <div className="lg:mt-12">
            <a
              href="/create"
              className="text-xl bg-purple-600 inline-block text-center rounded m-1 p-5 ml-10"
            >
              Create A Meeting
            </a>
            <a
              href="/join"
              className="text-xl bg-purple-600 inline-block text-center rounded m-1 p-5 ml-10"
            >
              Join a Meeting
            </a>
          </div>
        </div>
        <div className="lg:mt-44 gif border-4 border-sky-500 w-full h-fit">
          <img src={demoGif} alt="gif" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;

/*
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
    needs: build
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
