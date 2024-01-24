import React, { useState, ChangeEvent } from "react";
import "./AddCourse.style.css";
import { Video, Course } from "./Course.type";

type Props = {
    onBackPageClick: () => void;
    onSubmitClickHandler: (data : Course) => void;
}

function formatDateBrazil(inputDate : string) { 
    const [year, month, day] = inputDate.split('-');

    const result = [ day, month, year ].join('/');
    return result; 
}

const AddCourse = (props : Props) => {
    const { onBackPageClick, onSubmitClickHandler } = props;
    
    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        date: "",
        video: [],
    })

    const [videos, setVideos] = useState<Video[]>([])
    const [videoTitle, setVideoTitle] = useState<string>("");
    const [videoLink, setVideoLink] = useState<string>("");
    const [videoSize, setVideoSize] = useState<number>(0);

    const addVideos = (): void => {
        const newVideo = { id: new Date().toJSON().toString(), title: videoTitle, link: videoLink, size: videoSize}
        setVideos([...videos, newVideo])
        setVideoTitle("")
        setVideoLink("")
        setVideoSize(1)
    }

    const handleChangeVideo = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
        if(name === "videoTitle") setVideoTitle(value);
        if(name === "videoLink") setVideoLink(value);
        if(name === "videoSize") setVideoSize(Number(value));
    }

    const changeHandlerFormCourse = (event : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormInput({...formInput, [name] : value});
    }

    const onSubmitBtnClickHandler = (e: any) => {
        e.preventDefault();
        const data: Course = {
            id: new Date().toJSON().toString(),
            title: formInput.title,
            description: formInput.description,
            date: formInput.date,
            video: videos,
        }
        onSubmitClickHandler(data);
        onBackPageClick();
    };

    return <div className="addCourse">
        <div >
            <h3>Informações do Curso</h3>
        </div>
        <form onSubmit={onSubmitBtnClickHandler}>
            <div>
                <label>Título : </label> <br />
                <input 
                    type="text"
                    name="title" 
                    value={formInput.title} 
                    onChange={changeHandlerFormCourse} 
                    />
            </div>
            <div>
                <label>Descrição do Curso : </label> <br />
                <input 
                    type="text" 
                    name="description"     
                    value={formInput.description} 
                    onChange={changeHandlerFormCourse}
                    />
            </div>
            <div>
                <label>Data de Término : </label> <br />
                <input 
                required
                type="date" 
                name="date" 
                value={formInput.date}
                onChange={changeHandlerFormCourse}
                />
            </div>
            <div>
                <h3>Adicionar Video</h3>
            </div>
            
            <div>
                <label>Título do Vídeo: </label><br />
                <input 
                required={videos.length === 0}
                type="text" 
                name="videoTitle"
                value={videoTitle}
                onChange={handleChangeVideo}
                />
            </div>
            <div>
                <label>Link do Vídeo: </label><br />
                <input 
                required={videos.length === 0}
                type="text" 
                name="videoLink" 
                value={videoLink}
                onChange={handleChangeVideo}
                />
            </div>
            <div>
                <label>Tamanho do Vídeo em MB: </label><br />
                <input 
                required={videos.length === 0}
                type="number" 
                name="videoSize"
                value={videoSize}
                onChange={handleChangeVideo}
                min="1"
                />
            </div>
            <input 
            type="button" 
            value="Adicionar Video" 
            disabled={ !videoTitle || !videoLink || !videoSize } 
            onClick={addVideos} />
            <div>
                
                <input type="button" value="Voltar" onClick={onBackPageClick} />
                <input 
                    type="submit" 
                    disabled={
                              !formInput.title || 
                              !formInput.description || 
                              !formInput.date ||
                              videos.length === 0
                            } 
                    value="Adicionar Curso" />
                    { 
                    (
                    !formInput.title || 
                    !formInput.description || 
                    !formInput.date ||
                    videos.length === 0
                    ) &&  
                    <>
                    <span>
                        <p>
                            <small>
                                <b>Obrigatório</b>
                            </small>
                        </p>
                    </span>
                    <p>
                        <small>*Preencher todas as Informações do Curso</small>
                    </p>
                    <p>
                        <small>*E adicionar 1 vídeo para liberar o botão de Adicionar Curso</small>
                    </p>
                    </>
                    }
            </div>
        </form>

    </div>
    
}

export default AddCourse