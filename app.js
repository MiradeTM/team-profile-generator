const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const inquireType = () => {
    inquirer.prompt({
        type: "list",
        message: "What type of employee would you like to add?",
        choices: ["Intern", "Engineer", "Manager"],
        name: "type"
    });
}

const createEmployee = async ({type, id}) => {
    switch (type) {
        case "Intern": 
            const {
                name: intName, email: intEmail, school: intSchool
            } = await inquirer.prompt([{
                message: "What is the intern's first and last name?",
                name: "name"
            },
            {
                message: "What is the intern's email?",
                name: "email"
            },
            {
                message: "What school does the intern attend?",
                name: "school"
            }
        ]);
            const intern = new Intern(intName, id, intEmail, intSchool);
            employees.push(intern);
            break;

        case "Engineer":
            const {
                name: enName, email: enEmail, github: enGithub
            } = await inquirer.prompt([{
                message: "What is the engineer's first and last name?",
                name: "name"
            },
            {
                message: "What is the engineer's email?",
                name: "email"
            },
            {
                message: "Please provide the engineer's Github link.",
                name: "github"
            }
        ]);
            const engineer = new Engineer(enName, id, enEmail, enGithub);
            employees.push(engineer);
            break;

        case "Manager":
            const {
                name: mngName, email: mngEmail, officeNumber: mngOfficeNumber
            } = await inquirer.prompt([{
                message: "What is the manager's first and last name?",
                name: "name"
            },
            {
                message: "What is the manager's email?",
                name: "email"
            },
            {
                message: "Please provide the manager's office number.",
                name: "officeNumber"
            }
            ]);
                const manager = new Manager(mngName, id, mngEmail, mngOfficeNumber);
                employees.push(manager);
                break;
    }
}

const init = async () => {
    let entering = true;
    do{
        const{type} = await inquireType();
        const id = employee.length + 1;
        const currentEmployee = await createEmployee({type: type, id: id});
        const {addMore} = await inquirer.prompt([{
            type: "list",
            message: "Would you like to enter another employee?",
            choices: ["Yes", "No"],
            name: "addMore"
        }]);
        if (addMore === "No") entering = false;
    } while (entering);
    
    await writeFileAsync("./output/team.html", render(employees));

    console.log("Sucessfully started!");
}

init();
