import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PoiVehicles } from 'src/app/models/data.model';
import { ProcessDataService } from 'src/app/services/process-data.service ';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  processedData: PoiVehicles[] = [];
  plateFilter = new FormControl('');
  dateFilter = new FormControl('');
  isLoading: boolean = false;

  constructor(private processDataService: ProcessDataService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.processDataService.calculateTimeInPois().subscribe((data) => {
      this.processedData = data;
      this.isLoading = false;
    });
  }

  applyFilters(): void {
    this.isLoading = true;
    this.processedData = [];
    this.processDataService
      .calculateTimeInPois(
        this.plateFilter.value,
        this.formatDate(this.dateFilter.value)
      )
      .subscribe((data) => {
        this.processedData = data;
        this.isLoading = false;
      });
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
  }
}
