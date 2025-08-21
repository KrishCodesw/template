import axios from "axios";

export async function fetchReposByStack(
  stack: string,
  sort: "stars" | "forks" | "updated" = "stars",
  order: "asc" | "desc" = "desc"
){
const url = `https://api.github.com/search/repositories?q=${stack}+language:${stack}&sort=${sort}&order=${order}&per_page=20`;

try{
const res=await axios.get(url,{
    headers:{
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
})
return res.data.items;
}
catch(error: any){
    throw new Error(
         `Failed to fetch repos: ${error.response?.status} ${error.response?.statusText}`
    );
}
}