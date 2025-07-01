import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SchoolService } from './school.service';

@Component({
  selector: 'app-school',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [SchoolService],
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  schoolData: any[] = [];
  showAddPopup: boolean = false;
  formHeader: string = 'Add School';

  // Form fields
  name = '';
  address = '';
  established = '';
  website = '';
  editingId: number | null = null;

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.schoolService.getSchoolInfo().subscribe(
      (data) => this.schoolData = data,
      (error) => console.error('Error fetching data:', error)
    );
  }

  togglePopup(): void {
    this.showAddPopup = !this.showAddPopup;
  }

  openAddForm(): void {
    this.resetForm();
    this.formHeader = 'Add School';
    this.togglePopup();
  }

  editInformation(user: any): void {
    this.name = user.name;
    this.address = user.address;
    this.established = user.established;
    this.website = user.website;
    this.editingId = user.id;

    this.formHeader = 'Edit School';
    this.showAddPopup = true;
  }

  saveSchool(): void {
    const data = {
      name: this.name,
      address: this.address,
      established: this.established,
      website: this.website
    };

    const obs = this.editingId
      ? this.schoolService.updateSchool(this.editingId, data)
      : this.schoolService.addSchool(data);

    obs.subscribe(
      () => {
        this.loadData();
        this.resetForm();
        this.showAddPopup = false;
      },
      (error) => console.error(this.editingId ? 'Update error:' : 'Add error:', error)
    );
  }

  deleteInformation(userId: number): void {
    if (confirm('Are you sure you want to delete this school?')) {
      this.schoolService.deleteSchool(userId).subscribe(
        () => this.loadData(),
        (error) => console.error('Delete error:', error)
      );
    }
  }

  onCancel(): void {
    this.resetForm();
    this.showAddPopup = false;
  }

  resetForm(): void {
    this.name = '';
    this.address = '';
    this.established = '';
    this.website = '';
    this.editingId = null;
    this.formHeader = 'Add School';
  }
}
