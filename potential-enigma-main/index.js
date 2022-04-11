// // TODO: Include packages needed for this application

// // TODO: Create an array of questions for user input
// const questions = [];

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();


const inquirer = require('inquirer');
const fs = require('fs');

const buildReadmeTemplate = (data) => `
  # ${data.title}

  ## [My Github](https://github.com/${data.github})

  ### ${data.description}
`;

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      },
    },
    //question #3 Project Title
    {
      type: 'input',
      name: 'title',
      message: 'What is your project title? (Required)',
      validate: (titleInput) => {
        if (titleInput) {
          return true;
        }else {
          console.log('Please enter your projects title!')
          return false;
        }
      }
    },
    //Question 4
    {
      type: 'input',
      name: 'description',
      message: 'Please write a short description of your project. (Required)',
      validate: (descriptionInput) => {
        if (descriptionInput){
          return true;
        }else {
          console.log('Please enter a description of your project!')
          return false;
        }
      }
    },
    //question #5
    {
      type: 'list',
      name: 'license',
      message:  ''
    }
    // {
    //   type: 'confirm',
    //   name: 'confirmAbout',
    //   message:
    //     'Would you like to enter some information about yourself for an "About" section?',
    //   default: true,
    // },
    // {
    //   type: 'input',
    //   name: 'about',
    //   message: 'Provide some information about yourself:',
    //   when: ({ confirmAbout }) => confirmAbout,
    // },
  ]);
};

promptUser().then((portfolioData) => {
  const readMeContent = buildReadmeTemplate(portfolioData);
  fs.writeFile('./readme.md', readMeContent, err => {
    if (err) throw new Error(err);
    console.log('Page created! Check out readMeContent in this directory to see it!');
  });
});