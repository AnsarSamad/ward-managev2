import { Component, OnInit, Input } from '@angular/core';


interface Type{
  name:string ;
  selected:boolean ;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})


export class SidenavComponent implements OnInit {

  constructor() { }
 
  types:Type[] = [{name:'Ansar',selected:false},{name:'Biss',selected:false},{name:'Ab',selected:false}]
  expand:boolean = true; 
  @Input() menuSelected:string;
  ngOnInit() {
  }

  toggle(){
    this.expand = !this.expand;
  }

  toggleselection(type:Type){
    const index = this.types.findIndex((t) => t.name === type.name);
    var updatedType = {name:type.name,selected:!type.selected}
    this.types[index] = updatedType;
  }
}
