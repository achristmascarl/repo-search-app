export async function searchRepos(query: string) {
  return await fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query,
    )}&per_page=20`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        // TODO: technically the token shouldn't be exposed here
        //       on the client side, should create a server and
        //       have the token there for security reasons.
        //       just doing this for the sake of time 😬
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json.items;
    })
    .catch((err) => {
      throw new Error(err);
    });
}
