import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() applyFilters = new EventEmitter<{ plate: string; date: string }>();
  @Output() resetFilters = new EventEmitter<void>();

  plateFilter = new FormControl('');
  dateFilter = new FormControl('');
  filtersApplied: boolean = false;

  constructor() {}

  onApplyFilters(isEnterValue?: boolean): void {
    if (this.plateFilter.value == '' && isEnterValue == true) {
      return;
    } else {
      this.filtersApplied = true;
    }
    this.applyFilters.emit({
      plate: this.plateFilter.value.toUpperCase(),
      date: this.formatDate(this.dateFilter.value),
    });
  }

  onResetFilters(): void {
    this.plateFilter.setValue('');
    this.dateFilter.setValue('');
    this.filtersApplied = false;
    this.resetFilters.emit();
  }

  onFilterChange(): void {
    this.filtersApplied = false;
  }

  canApplyFilters(): boolean {
    return (
      this.plateFilter.value || this.dateFilter.value || this.filtersApplied
    );
  }

  private formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
  }
}
