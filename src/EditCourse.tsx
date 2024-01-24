import { useState } from 'react';
import { Course } from "./components/Course.type";
import './components/AddCourse.style.css';

type Props = {
    data: Course;
    onBackPageClick: () => void;
    onSubmitClickHandler: (data : Course) => void;
}

const EditCourse = (props: Props) => {
    const {data, onBackPageClick, onSubmitClickHandler} = props;

    const [formInput, setFormInput] = useState({
        id: data.id,
        title: data.title,
        description: data.description,
        date: data.date,
        video: data.video,
    })

    const onSubmitBtnClickHandler = (e: any) => {
        e.preventDefault();
        const data: Course = {
            id: formInput.id,
            title: formInput.title,
            description: formInput.description,
            date: formInput.date,
            video: [],
        }
        onSubmitClickHandler(data);
        onBackPageClick();
    };

    const changeHandlerFormCourse = (event : any) => {
        const { name, value } = event.target;
        setFormInput({...formInput, [name] : value});
    }

    return (
        <div className='editCourse'>
            <div>
                <h3>Editar Curso</h3>
            </div>
            <form onSubmit={onSubmitBtnClickHandler}>
            <div>
                <label>Título : </label>
                <input 
                    type="text"
                    name="title" 
                    value={formInput.title} 
                    onChange={changeHandlerFormCourse} 
                    />
            </div>
            <div>
                <label>Descrição do Curso : </label>
                <input 
                    type="text" 
                    name="description"     
                    value={formInput.description} 
                    onChange={changeHandlerFormCourse}
                    />
            </div>
            <div>
                <label>Data de Término : </label>
                <input 
                required
                type="text" 
                name="date"
                pattern="\d{2}-\d{2}-\d{4}" 
                value={formInput.date}
                onChange={changeHandlerFormCourse}
                />
            </div>
            <div>
                <input type="button" value="Voltar" onClick={onBackPageClick} />
                <input type="submit" value="Atualizar Curso" />
            </div>
            </form>
        </div>
            )
}

export default EditCourse;