
const inquirer = require('inquirer');
const fs = require('fs');

const licenseBadgeMap = {
  "AGPL-3.0": {
    name: "AGPL v3",
    badgeUrl: "https://img.shields.io/badge/License-AGPL_v3-blue.svg",
    licensePage: "https://www.gnu.org/licenses/agpl-3.0"
  },
  "MIT": {
    name: "MIT",
    badgeUrl: "https://img.shields.io/badge/License-MIT-yellow.svg",
    licensePage: "https://opensource.org/licenses/MIT"
  },
  "GPL-3.0": {
    name: "GPL v3",
    badgeUrl:"https://img.shields.io/badge/License-GPLv3-blue.svg",
    LicensePage:"https://www.gnu.org/licenses/gpl-3.0"
  }

}

const buildReadmeTemplate = (data) => `
  # ${data.title}

  ## [Table of content](#java-something)
  * [License](#license)
  * [[My Github](https://github.com/deadpool3413)]
  * [Description](#description)
  * [Testing](#testing)
  * [Contributions](#contributions)
  * [Additional information on Repo](#additional-information-on-repo)

  ## License
  [![License: ${licenseBadgeMap[data.license].name}](${licenseBadgeMap[data.license].badgeUrl})](${licenseBadgeMap[data.license].licensePage})

  ## [My Github](https://github.com/${data.github})

  ## Description
  ##### ${data.description}

  ## Testing
  ### To run the test write command ${data.testing}

  ## Contributions
  ##### ${data.contributions}

  ## Additional information on Repo
  ##### ${data.usage}

  ## Questions

  ##### Check out my GitHub profile at https://github.com/${data.github}
  ##### Still have questions? Reach me at ${data.email}


`;

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'What is your email? (Required)',
      validate: (emailInput) => {
        if (emailInput) {
          return true;
        } else {
          console.log('Please enter your email!');
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
      message:  'Select a license for your project. (Required)',
      choices: ["MIT", "AGPL-3.0", "GPL-3.0", "N/A"],
      validate: (licenseList) =>{
        if (licenseList){
          return true;
        }else{
          console.log('Please select a license option!')
          return false;
        }
      }
    },
    //Question #6
    {
      type: 'list',
      name: 'testing',
      message: 'What command should be run to run test? (required)',
      choices: ["npm test", "yarn test"],
      validate: (testingList) => {
        if (testingList){
          return true;
        }else{
          console.log('Please select a command to run tests!');
          return false;
        }
      }
    },

    //Question #7
    {
      type: 'input',
      name: 'contributions',
      message: 'What exactly does the user need to know about contributing to this Repo? (Optional)'
    },
    //Question #8
    {
      type: 'input',
      name: 'usage',
      message: 'What does the user need to know about using this Repo? (Optional)'
    },

  ]);
};

promptUser().then((portfolioData) => {
  const readMeContent = buildReadmeTemplate(portfolioData);
  fs.writeFile('./readme.md', readMeContent, err => {
    if (err) throw new Error(err);
    console.log('Page created! Check out readMeContent in this directory to see it!');
  });
});