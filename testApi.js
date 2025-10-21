import axios from "axios";

axios.get("http://localhost:8080/",{
    auth:{
        username:'test2@gmail.com',
        password: '1234'
    }
    
}).then((response)=>{
    console.log(response.data);
})

