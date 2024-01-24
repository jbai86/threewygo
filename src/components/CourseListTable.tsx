import {useState} from 'react';
import { Course } from './Course.type';
import './CourseListTable.style.css';
import CourseModal from './CourseModal';

type Props = { 
list: Course[];
onDeleteEventHandler: (data: Course) => void;
onEditCourseDetailsHandler: (data: Course) => void;
}

const CourseListTable = (props: Props) => {

    const { list, onDeleteEventHandler, onEditCourseDetailsHandler } = props;
    const [showModal, setShowModal] = useState(false);
    const [courseDetails, setCourseDetails] = useState(null as Course | null);

    const viewCourseDetails = (data: Course) => {
        setShowModal(true);
        setCourseDetails(data);
    }

    const onCloseModal = () => setShowModal(false);

    return (
    <div>  
        <div className="curso-wrapper">
        {list.map((course) =>  {
                const { video } = course
                let sum = video.reduce((sum, v) => sum + v.size, 0)
                let courseDateConverter = new Date(course.date)
                let now = new Date()
                const checkValidDate = courseDateConverter > now;
                
                if(checkValidDate) {
                return (      
                <div className="curso" key={course.id}>
                    
                    <div className="curso-img">
                        <img src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    
                <div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <p> Tamanho total dos vídeos: {sum} MB</p>
                    
                        <div>
                            <input type="button" value="Ver" onClick={() => viewCourseDetails(course)}/>
                            <input type="button" value="Editar" onClick={() => onEditCourseDetailsHandler(course)} />
                            <input type="button" value="Deletar" onClick={() => onDeleteEventHandler(course)}/>
                        </div>
                    
                </div>
                </div>
                );
                } 
            })}
             { showModal && 
              courseDetails !== null && 
              ( 
                <CourseModal onClose={onCloseModal} data={courseDetails} />
              )}
        </div>
    </div>
    );
}

export default CourseListTable;