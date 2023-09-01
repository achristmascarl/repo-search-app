# repo-search-app

## Getting it to run

1. Make sure you have `yarn` installed
2. Make sure you have `expo` installed: https://docs.expo.dev/get-started/installation/
3. Run `yarn` to install dependencies
4. Run `expo install` for more dependencies
5. Create a `.env` file and set `EXPO_PUBLIC_GITHUB_TOKEN` to a valid GitHub personal access token with at least public repo scope
6. If on a Mac, run `yarn ios` to open in the iOS simulator

## Notes

- There are some Typescript errors, namely around typing for `react-navigation`, that I left as is since that wasn't the focus of the take home
- There are some commented out skeleton functions for minor improvements I would have liked to get around to (humanizing numbers, highlighting search terms, etc.)
- The way the github token is used is not good from a security perspective and it shouldn't be done that way in prod, but since having a server wasn't the focus of the take home, I left it as is
