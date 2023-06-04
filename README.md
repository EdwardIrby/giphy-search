# Giphy Search

A simple web site to search for gifs using Giphy. Time boxing to 4-5 hours of work.


## UX Requirements
- Pagination
- Adjust Page count 25 50 75 
- Use Search params to indicate current offset
- When clicking on a gif it should try and share it

## Bugs and Todos
 
Plenty this is a simple website and there are edge cases that are not accounted for. 
 
- The Giphy sdk couldn't be used because of use of `type="module"` in package.json field
- It's not a Responsive design and is best used on a desktop monitor
- It exposes the api key client side opening it up for abuse
- The entire repo lacks test but time boxing this didn't really allow for that.
- Navigation buttons do not update results when used
- Needs more rich styling, animations, and a better empty state

## Dev Requirements

### local

- Bun >= 0.5.9

### devcontainer

- vscode
- Docker

## Dev Setup

### local

1. Clone repository and ensure you have bun >= 0.5.9 installed
2. Run `bash setup.sh`

### devcontainer

1. Install docker on local machine
2. Ensure docker desktop daemon/app is running
3. Open new window for VSCode
4. `ctrl/cmd + shift + p`
5. Search for **Dev Containers:Clone Repository in Container Volume**
6. Enter this repo name **plaited/utils**
7. Wait for it to download and set everything up
8. Open a VSCode terminal tab and run `zsh setup.sh`

## codespaces
1. Login into github
2. Click on green code button and create codespace
3. In codespaces terminal run `zsh setup.sh`

 ![Screenshot 2023-06-04 180710](https://github.com/EdwardIrby/giphy-search/assets/1058725/34cd8b5a-3528-4ffb-b5aa-e62aa9c7fdd4)
