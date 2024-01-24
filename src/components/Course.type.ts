export interface Video {
    id: string, 
    title: string,
    link: string,
    size: number,
}

export interface Course {
    id: string, 
    title: string, 
    description: string,
    date: string,
    video: Array<Video>
}

export const courseListFake : Course[] = [{
    id: new Date().toJSON().toString(),
    title: "Course 1",
    description: "Course description 1",
    date: new Date().toLocaleDateString('pt-br'),
    video: []
}]

export enum PageCourseEnum {
    list, 
    add, 
    edit,
}