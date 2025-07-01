import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [StudentsService],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentsData: any[] = [];

  showAddPopup: boolean = false;
  formHeader: string = 'Add Student';

  name = '';
  age = '';
  subject = '';
  className = '';

  editingId: number | null = null;

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentsService.getStudents().subscribe(
      (data) => {
        this.studentsData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openAddForm(): void {
    this.resetForm();
    this.formHeader = 'Add Student';
    this.showAddPopup = true;
  }

  editStudent(student: any): void {
    this.formHeader = 'Edit Student';
    this.editingId = student.id;
    this.name = student.name;
    this.age = student.age;
    this.subject = student.subject;
    this.className = student.class || student.className;
    this.showAddPopup = true;
  console.log('showAddPopup:', this.showAddPopup); // Debug log
}

  saveStudent(): void {
    const student = {
      name: this.name,
      age: this.age,
      subject: this.subject,
      class: this.className
    };

    if (this.editingId) {
      this.studentsService.updateStudent(this.editingId, student).subscribe(() => {
        this.resetForm();
        this.loadStudents();
      });
    } else {
      this.studentsService.addStudent(student).subscribe(() => {
        this.resetForm();
        this.loadStudents();
      });
    }
  }

  deleteStudent(id: number): void {
    this.studentsService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  resetForm(): void {
    this.name = '';
    this.age = '';
    this.subject = '';
    this.className = '';
    this.editingId = null;
    this.showAddPopup = false;
    this.formHeader = 'Add Student';
  }
}