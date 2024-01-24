import React from 'react';
import { useState } from 'react';
import './App.css';
import CourseListTable from './components/CourseListTable';
import { courseListFake, Course, PageCourseEnum } from './components/Course.type';
import AddCourse from './components/AddCourse';
import EditCourse from './EditCourse';
import logo from './3wygo.png';

function App() {
  const [courseList, setCourseList] = useState(
    courseListFake as Course[]
  );

  const [showListPage, setShowListPage] = useState(PageCourseEnum.list);
  const [editCourseInfo, setEditCourseInfo] = useState({} as Course);

  const onPageCourseStatusHandler = () => {
      setShowListPage(PageCourseEnum.add);
  };

  const onPageCourseStatusBackHandler = () => {
    setShowListPage(PageCourseEnum.list);
  };

  const addCourse = (data: Course) => {
      setCourseList([...courseList, data]);
   }

   const onDeleteCourse = (data: Course) => {
      const indexDeleteCourse = courseList.indexOf(data);
      const oldCourseList = [...courseList];

      oldCourseList.splice(indexDeleteCourse, 1);
      setCourseList(oldCourseList);
   }

   const onEditCourse = (data: Course) => {
      setShowListPage(PageCourseEnum.edit);
      setEditCourseInfo(data);
   }

   const updateDataCourse = (data: Course) => {
      const indexEditCourse = courseList.filter( x => x.id === data.id)[0];
      const indexRecordCourse = courseList.indexOf(indexEditCourse);
      const oldData = [...courseList]

      oldData[indexRecordCourse] = data;
      setCourseList(oldData);
   }

  return (
    <div className="App">
      <header>
          <img src={logo} alt="Threewygo" />
      </header>
      { showListPage === PageCourseEnum.list && 
        <>
          <div>
          <input type="button" value="Adicionar Curso" onClick={onPageCourseStatusHandler}/>
          </div>
        <CourseListTable 
          list={courseList} 
          onDeleteEventHandler={onDeleteCourse}
          onEditCourseDetailsHandler={onEditCourse}
          />
        </>
      }

      { showListPage === PageCourseEnum.add && 
        (
          <>
            <AddCourse 
              onBackPageClick={onPageCourseStatusBackHandler} 
              onSubmitClickHandler={addCourse}/>
          </>
        )
      }

      {
        showListPage === PageCourseEnum.edit && 
        <EditCourse 
          data={editCourseInfo} 
          onBackPageClick={onPageCourseStatusBackHandler}  
          onSubmitClickHandler={updateDataCourse}
          /> 
      }
      
    </div>
  );
}

export default App;
