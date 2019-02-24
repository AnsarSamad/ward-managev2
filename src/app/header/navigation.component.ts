import {Component, Input, Output ,EventEmitter} from '@angular/core'

@Component({
    selector:'nav-header',
    templateUrl:'./navigation.component.html',
    styleUrls:['navigation.component.css']
})
export class NavigationComponent{

    @Input() isAdmin:boolean;
    @Input() loggesInUser:string;
    @Output() navigation =  new EventEmitter<string>();

    constructor(){

    }
    navigate(mode:string){
        this.navigation.emit(mode);
    }
}