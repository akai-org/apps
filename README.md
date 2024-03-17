# AKAI Apps

Website dedicated for showcasing web apps created by members of AKAI.

## Configuring how your project is displayed 
If you want to customize how your project is displayed on website:

1. Create `.akai` directory in root of your project.
2. Structure content inside this directory like this:
    ```
    ├── config.json
    ├── logo.png
    └── readme.md
    ```
    - config.json(still wip) for now contains two fields:
        ```
        "name": string
        "technologies": string[]
        ```
        First field is simply for setting different name other than name of the repo to display (e.g. you want to display more fitting title for the whole project). Second field is used for defining technologies used in project that don't show up anywhere on github like for example what programming languages does given repo consists of.
    - logo.png - just logo of your project.
    - readme.md - good ol' github compliant markdown file. Why not the README file which is in root of most of repositories? Because often that README most of the time contains more of the technical stuff. How to setup the project, how to contribute, how to configure etc. Inside of the readme inside of the `.akai` directory You can focus on story behind the project, motivation, provide more screenshots (not now) to show usage of your app etc.

## Setup locally
```
git clone https://github.com/akai-org/apps.git
pnpm install
```
Then change name of `.env.example` to `.env` and paste your github api token inside it.
Now execute command
```
pnpm dev
```
And you are good to go.



