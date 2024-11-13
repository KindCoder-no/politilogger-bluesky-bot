import axios from "axios";

async function fetchLatestPoliceUpdate() {
  const data = JSON.stringify({
    category: [],
    skip: 0,
    //sortByEnum: "LastMessageOn",
    take: 1,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://politiloggen-vis-frontend.bks-prod.politiet.no/api/messagethread",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response = await axios(config);

  return response.data;
}

export default fetchLatestPoliceUpdate;
