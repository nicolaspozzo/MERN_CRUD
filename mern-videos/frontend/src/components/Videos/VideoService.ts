
import axios from 'axios'
import {Video} from './Video'

const API = 'http://localhost:4000'

export const getVIdeos = async ()=>{
    
    return await axios.get<Video[]>(`${API}/videos`)    
}

export const createVideo = async (video:Video)=>{
    return await axios.post(`${API}/videos`, video)
}

export const getVIdeo = async (id: string)=>{    
    return await axios.get<Video>(`${API}/videos/${id}`)    
}
export const updateVIdeo = async (id: string, video:Video)=>{    
    return await axios.put<Video>(`${API}/videos/${id}`, video)    
}
export const deleteVIdeo = async (id: string)=>{    
    return await axios.delete<Video>(`${API}/videos/${id}`)    
}