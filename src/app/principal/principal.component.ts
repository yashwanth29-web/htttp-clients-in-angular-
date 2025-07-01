import { Component, OnInit } from '@angular/core';
import { PrincipalService } from './principal.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  providers: [PrincipalService],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  principalData: any[] = []; 

  // Add/Edit popups control
  showAddPopup: boolean = false;
  showEditPopup: boolean = false;

  // Form fields
  formHeader: string = 'Add Principal';
  name = '';
  tenure = '';
  salary = 0;
  email = '';

  // For editing
  editingId: number | null = null;

  constructor(private principalService: PrincipalService) {}

  ngOnInit(): void {
    this.showInformation();
  }

  showInformation(): void {
    this.principalService.getPrincipalInfo().subscribe(
      (data) => {
        this.principalData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Trigger Edit
  editInformation(user: any): void {
    this.formHeader = 'Edit Principal';
    this.editingId = user.id;
    this.name = user.name;
    this.tenure = user.tenure;
    this.salary = user.salary;
    this.email = user.email;
    this.showEditPopup = true;
  }

  // Delete
  deleteInformation(userId: number): void {
    console.log('Deleting user with id:', userId);
    this.principalService.deletePrinciple(userId).subscribe(
      (res) => {
        console.log('Delete response:', res);
        this.showInformation();
      },
      (error) => {
        console.error('Delete error:', error);
      }
    );
  }

  // Add or Update
  savePrincipal(): void {
    const payload = {
      name: this.name,
      tenure: this.tenure,
      salary: this.salary,
      email: this.email
    };

    if (this.editingId) {
      this.principalService.updatePrincipal(this.editingId, payload).subscribe(
        () => {
          this.resetForm();
          this.showInformation();
        }
      );
    } else {
      this.principalService.addPrincipal(payload).subscribe(
        () => {
          this.resetForm();
          this.showInformation();
        }
      );
    }
  }

  // Cancel and Clear Form
  resetForm(): void {
    this.name = '';
    this.tenure = '';
    this.salary = 0;
    this.email = '';
    this.editingId = null;
    this.showAddPopup = false;
    this.showEditPopup = false;
    this.formHeader = 'Add Principal';
  }

  // Show Add Popup
  openAddForm(): void {
    this.resetForm();
    this.showAddPopup = true;
  }
}
