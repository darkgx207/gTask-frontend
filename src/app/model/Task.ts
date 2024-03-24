import { Group } from "./Group"

export class Task {
    public id!:number
    public name!:string
    public description!:string
    public done!:boolean
    public group!:Group
    
    constructor(name?:string,description?:string,done?:boolean, group?:Group){
        this.name = name ||''
        this.description = description || ''
        this.done = done || false
        this.group = group || new Group()
    }
    
    //Definir ID
}