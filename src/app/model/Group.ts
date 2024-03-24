export class Group {
    public id!:number
    public name!:string

    
    constructor(id?:number ,name?:string){
        this.id = id || 0
        this.name = name || ''
    }

    //Definir ID
}