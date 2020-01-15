import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    isPieSelected :boolean = false;
    isBarSelected :boolean = false;
    constructor(){

    }
    ngOnInit(){
        this.dropdownList = [
                              {"id":1,"itemName":"PieChart"},
                              {"id":2,"itemName":"BarChart"},
                            ];
        this.selectedItems = [ ];
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Chart types",                                  
                                  classes:"myclass custom-class"
                                };    
                                
       // api all for chart data and form charts here                         
    }
    onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
        this.toggleCharts();
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
        this.toggleCharts();
    }
    onSelectAll(items: any){
        console.log(items);
        this.isBarSelected = true;
        this.isPieSelected=true;
    }
    onDeSelectAll(items: any){
      console.log('meee')
        console.log(items);
        this.reset();
    }
    
    toggleCharts(){      
      this.reset()
        this.selectedItems.forEach((charts)=>{
          if(charts.itemName == "PieChart"){
            this.isPieSelected = true;
          }
          if(charts.itemName == "BarChart"){
            this.isBarSelected = true;
          }
        })
    }
    
    reset(){
      this.isPieSelected = false;
      this.isBarSelected = false;
    }
  }
