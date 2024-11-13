import axios from "axios";

async function fetchPoliceUpdateById(id: string) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url:
      "https://politiloggen-vis-frontend.bks-prod.politiet.no/api/messagethread/getbyid?id=" +
      id,
    headers: {},
  };

  let response = await axios(config);

  return response.data;
}

export default fetchPoliceUpdateById;
