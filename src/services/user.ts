import api from "./axios";


const getCurrentUsers = () => {
    const fetchData = async () => {
      try {
        const res = await api.get("/v1/User/GetCurrentUser");
        console.log(res.data); 
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData(); 
}


export default getCurrentUsers;