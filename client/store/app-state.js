import {
    observable,
    computed,
    action,
    autorun
} from 'mobx'

export class AppState {

    constructor({count,name} = {count:0,name:'pjt'}){
        this.name = name;
        this.count = count;
    }

    @observable count;

    @observable name;

    @computed get msg(){
        return `${this.name} say count is ---> ${this.count}`;
    }

    @action add(){
        this.count +=1;
    }

    @action changeName(){
        this.name = 'zhangsan';
    }

    toJson(){
        return {
            count:this.count,
            name:this.name
        }
    }
}


export default AppState;
