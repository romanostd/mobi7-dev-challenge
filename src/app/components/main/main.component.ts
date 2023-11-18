import { Component, OnInit } from '@angular/core';
import { ProcessDataService } from 'src/app/services/process-data.service ';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  processedData: any;

  constructor(private processDataService: ProcessDataService) {}

  ngOnInit(): void {
    this.processDataService.calculateTimeInPois().subscribe(data => {
      this.processedData = this.transformDataForTable(data);  
    });
  }

  transformDataForTable(data: any): any[] {
    const tableData = [];
    for (const poiName of Object.keys(data)) {
      for (const plate of Object.keys(data[poiName])) {
        tableData.push({
          plate: plate,
          poiName: poiName,
          totalTime: data[poiName][plate].totalTime
        });
      }
    }
    return tableData;
  }
}
