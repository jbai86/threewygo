import { Course } from './Course.type';
import './CourseModal.style.css';

type Props = {
    onClose: () => void;
    data: Course
}

const CourseModal = (props: Props) => {

    const { onClose, data } = props;
    
    return (
    <div id="modal" className="modal">
    <div className="modal-content">
      <div>
        <span className="close" onClick={onClose}>&times;</span>
        <div>
            <h3>Detalhes do Curso:</h3>
            <div>
                <div>
                    <label>Título: {data.title}</label> <br/>
                    <label>Descrição: {data.description}</label> <br/>
                    <label>Data de Término: {data.date}</label> <br/>
                </div>
                <br />
                <div>
                  {data.video.map((v, index) => {
                     return (
                      <>
                        <label>Video - {index+1}</label> <br />
                        <label>Título: </label><span>{v.title}</span> <br />
                        <label>Link: </label><span>{v.link}</span> <br />
                        <label>Tamanho do Vídeo (MB):</label><span>{v.size}</span>
                      </>
                     )
                  })}
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default CourseModal;