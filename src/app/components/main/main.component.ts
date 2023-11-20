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
  filtersApplied: boolean = false;

  constructor(private processDataService: ProcessDataService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(plate: string = '', date: string = ''): void {
    this.isLoading = true;
    this.processDataService.calculateTimeInPois(plate, date).subscribe((data) => {
      this.processedData = data;
      this.isLoading = false;
    });
  }

  onApplyFilters(filters: { plate: string; date: string }): void {
    this.fetchData(filters.plate, filters.date);
  }

  onResetFilters(): void {
    this.fetchData();
  }
}
