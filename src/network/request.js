import axios from 'axios'


export function request(config){
        const install=axios.create({
            baseURL:'http://152.136.185.210:7878/api/hy66',
            timeOut:5000
        });

        install.interceptors.request.use(data=>{
            return data;
        },err=>{
            return err;
        });

        install.interceptors.response.use(data=>{
            return data.data
        },err=>{
            console.log(err)
        })
    
       return install(config)
}