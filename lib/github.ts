import axios from "axios";

export async function fetchReposByStack(
  keyword: string,
  language: string,
  sort: "stars" | "forks" | "updated" = "stars",
  order: "asc" | "desc" = "desc",
  page:string,
  per_page:string
){
const url = `https://api.github.com/search/repositories?q=${keyword}+language:${language}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`;

try{
const res=await axios.get(url,{
    headers:{
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
})
return res.data.items;
}
catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to fetch repos: ${error.response?.status} ${error.response?.statusText}`
      );
    }
    throw new Error("Failed to to fetch repos: Unknown error");
  }
}