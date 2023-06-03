# Frontend Take-Home Assignment: Movie Ranker

## The Movie Ranker App

In the `./src` folder you will find a react app for creating and managing ranked lists of movies. A user can create a list, name it, associate it with genres, pick movies and rank them using this app.

## Setup

You will need to have [ node ](https://nodejs.org/en/download/), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

Before beginning the challenge, please run the following commands to initialize the repository and create a jumping off point.
```bash
$ git init
$ git add .
$ git commit -m 'starting point'
```

To start the application, first install the packages with: `yarn install`

Then, use the `yarn start` command to start the dev server.

As you complete the challenges below, feel free to utilize any npm packages you deem necessary to include.

Good luck!

---

## Please complete the following challenges:

### Challenge 1: Validation

Validation should be added to the `InitializeMovieListForm` component

-   A list name should be at least 5 characters long.
-   The user should be required to select 2 genres to create a list.
-   There should be a validation message for each input that isn't passing validation.
-   A list should not be able to be created without passing the validation.

### Challenge 2: Update Search Logic

If you search and select a movie then update the search term, the movies you previously selected will be lost as the results update. Please update the logic so that selected movies are preserved until they are un-selected. Unselecting a movie shouldn't make it immediately disappear from the list, but rather allow it to be removed when the search term is updated next.

### Challenge 3: Account for larger lists

Movie lists have no limit in size and could get very large. Please create a solution that fits the following criteria:

-   Only 10 movies should be rendered at first, but as you scroll to the bottom of the page the next ten should load automatically.
-   Movie data should only be loaded from the TMDB API when necessary (when about to be made visible) as opposed to all at once.

Feel free to refactor existing logic as need be.

### Challenge 4: Testing

Please devise a way to test the functionality of challenge 1. This task is open-ended, allowing you to create new files and folders, install packages, and pick a testing strategy as you wish. There can be multiple acceptable answers here, be prepared to discuss why you chose the method you did in subsequent interviews.

---

## Submission

**NOTE: Please do not publish this assessment to a public repository.**

To complete the challenge, please create a commit for each challenge (eg: "challenge 1: add validation") before zipping the folder you've been working in and emailing the contents to the representative who sent you the assessment. Please do not include the node_modules folder in the deliverable.
