import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import * as videoService from './VideoService'
import { toast } from 'react-toastify'

import { useHistory, useParams } from 'react-router-dom';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface Params {
    id: string
}

const VideoForm = () => {

    const history = useHistory()
    const params = useParams<Params>()

    const initialState = { title: '', description: '', url: '' }
    const [video, setvideo] = useState<Video>(initialState);

    const handleInputChange = (e: InputChange) => {
        setvideo({ ...video, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!params.id) {
            const res = await videoService.createVideo(video);
            toast.success('New video added');
            setvideo(initialState)
        } else {
            await videoService.updateVIdeo(params.id, video)
            toast.success('Video Updated');
        }


        history.push('/')
    }


    const getVideo = async (id: string) => {
        const res = await videoService.getVIdeo(id);
        const { title, description, url } = res.data;
        setvideo({ title, description, url })
        //console.log(res);
    }

    useEffect(() => {
        if (params.id) getVideo(params.id);;
    }, []);

    return (
        <div className="row">
            <div className="col-md-4 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        {
                            params.id ? (
                                <h3>Uptdate Video</h3>
                            ) : (
                                    <h3>New Video</h3>
                                )}
                        {/* <h3>New Video</h3> */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Write a title for this video"
                                    className="form-conntrol"
                                    onChange={handleInputChange}
                                    // value={video.title}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="url"
                                    name="url"
                                    placeholder="http://somesite.com"
                                    className="form-control"
                                    // value={video.url}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <textarea name="description"
                                    rows={3}
                                    className="form-control"
                                    // value={video.description}
                                    placeholder="Write a description"
                                    onChange={handleInputChange}
                                />
                            </div>
                            {
                                params.id ? (

                                    <button className="btn btn-info">Update Video</button>
                                ) : (
                                        <button className="btn btn-primary">Create Video</button>
                                    )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoForm;
