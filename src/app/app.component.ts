import { Component, ElementRef, Renderer2, ViewChild ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf,NgFor} from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgIf,NgFor]
})
export class AppComponent  {
  title = 'App';

  @ViewChild('container', { static: true }) container!: ElementRef;
  constructor(private renderer: Renderer2) { }  
 
    // This method is called when the component initializes
    ngOnInit() {
      
      // Load table data from localStorage when the component initializes
      const savedData = localStorage.getItem('tableData');
      if (savedData) {
        this.tableData = JSON.parse(savedData);
      }
      
    }
  
  tableData: { AssignedTo: string; status: string; date: string; priority: string; Description: string}[] = [];

  // Track modal visibility state
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

    // Add the new row to the table data
    this.tableData.push(newRow);
    // Save updated tableData to localStorage
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
  // Open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Method to refresh table data
   // Delete a row
   deleteRow(index: number) {
    this.tableData.splice(index, 1);  // Remove the item from the array
    localStorage.setItem('tableData', JSON.stringify(this.tableData));  // Update localStorage
  }

 
  refreshTableData() {
    // Clear the table data
    this.tableData = [];
  
    // Optionally, clear localStorage as well if needed
    localStorage.removeItem('tableData');
  }

}