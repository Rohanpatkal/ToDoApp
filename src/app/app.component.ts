import { Component, ElementRef, Renderer2, ViewChild ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf,NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgIf,NgFor,FormsModule]
})
export class AppComponent  {
  title = 'App';

  @ViewChild('container', { static: true }) container!: ElementRef;
  constructor(private renderer: Renderer2) { }  
    formData = {
      AssignedTo: '',
      status: '',
      date: '',
      priority: '',
      Description: ''
    };
    ngOnInit() {
      const savedData = localStorage.getItem('tableData');
      if (savedData) {
        this.tableData = JSON.parse(savedData);
      }
    }
  
  tableData: { AssignedTo: string; status: string; date: string; priority: string; Description: string}[] = [];

  isModalOpen = false;
  selectedUser: string = '';
  selectedStatus : string = '';
  selectedDate : string = '';
  selectedPriority : string = '';
  selectedDescription : string = '';
  editIndex: number | null = null;
  editedUser: string = '';
  editedStatus: string = '';
  editedDate: string = '';
  editedPriority: string = '';
  editedDescription: string = '';

  user(event: any) {
    this.selectedUser = event.target.value;
  }
  status(event: any) {
    this.selectedStatus = event.target.value;
  }
  date(event: any) {
    this.selectedDate = event.target.value;
  }
  priority(event: any) {
    this.selectedPriority = event.target.value;
  }
  Description(event: any) {
    this.selectedDescription = event.target.value;
  }
  addRow() {
    const newRow = {
      AssignedTo: this.selectedUser,
      status: this.selectedStatus,
      date: this.selectedDate,
      priority: this.selectedPriority,
      Description: this.selectedDescription
    };
    this.tableData.push(newRow);
    localStorage.setItem('tableData', JSON.stringify(this.tableData));
  }
  handleAction(event: any, index: number) {
    const action = event.target.value;
    
    if (action === 'edit') {
      this.editRow(index);
    } else if (action === 'delete') {
      this.deleteRow(index);
    }
  }
  editRow(index: number) {
    this.isModalOpen = true;
  }
    openModal(editIndex: number | null = null) {
      this.isModalOpen = true;
      this.editIndex = editIndex;
  
      if (editIndex !== null) {
        const task = this.tableData[editIndex];
        this.formData = { ...task };
      } else {
        this.formData = { AssignedTo: '', status: '', date: '', priority: '', Description: '' };
      }
    }
   closeModal() {
    this.isModalOpen = false;
    this.editIndex = null;
  }
  saveTask() {
    if (this.editIndex !== null) {
      this.tableData[this.editIndex] = { ...this.formData };
    } else {
      this.tableData.push({ ...this.formData });
    }

    localStorage.setItem('tableData', JSON.stringify(this.tableData));

    this.closeModal();
  }
   deleteRow(index: number) {
    this.tableData.splice(index, 1);  
    localStorage.setItem('tableData', JSON.stringify(this.tableData)); 
  }

   refreshTableData() {
    this.tableData = [];
    localStorage.removeItem('tableData');
  }
}
