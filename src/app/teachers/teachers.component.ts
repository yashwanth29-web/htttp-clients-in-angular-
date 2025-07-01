import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeachersService } from './teachers.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  providers: [TeachersService]
})
export class TeachersComponent implements OnInit {
  teacherData: any[] = [];
  showAddPopup = false;
  formHeader = 'Add Teacher';

  name = '';
  subject = '';
  qualification = '';
  email = '';
  editingId: number | null = null;

  constructor(private teacherService: TeachersService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.teacherService.getTeachers().subscribe(
      (data) => this.teacherData = data,
      (error) => console.error('Error:', error)
    );
  }

  openAddForm(): void {
    this.resetForm();
    this.formHeader = 'Add Teacher';
    this.showAddPopup = true;
  }

  editInformation(teacher: any): void {
    this.name = teacher.name;
    this.subject = teacher.subject;
    this.qualification = teacher.qualification;
    this.email = teacher.email;
    this.editingId = teacher.id;
    this.formHeader = 'Edit Teacher';
    this.showAddPopup = true;
  }

  deleteInformation(id: number): void {
    if (confirm('Are you sure to delete?')) {
      this.teacherService.deleteTeacher(id).subscribe(() => this.loadData());
    }
  }

  saveTeacher(): void {
    const payload = {
      name: this.name,
      subject: this.subject,
      qualification: this.qualification,
      email: this.email
    };

    const obs = this.editingId
      ? this.teacherService.updateTeacher(this.editingId, payload)
      : this.teacherService.addTeacher(payload);

    obs.subscribe(() => {
      this.loadData();
      this.resetForm();
      this.showAddPopup = false;
    });
  }

  onCancel(): void {
    this.resetForm();
    this.showAddPopup = false;
  }

  resetForm(): void {
    this.name = '';
    this.subject = '';
    this.qualification = '';
    this.email = '';
    this.editingId = null;
    this.formHeader = 'Add Teacher';
  }
}
