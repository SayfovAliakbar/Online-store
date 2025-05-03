import get from "./dom.js";

const API = "http://localhost:3000/data";

async function getData() {
    try {
        const res = await axios.get(API);
        get(res.data); 
        return res.data; 
    } catch (error) {
        console.error(error);
    }
}

export { getData }
