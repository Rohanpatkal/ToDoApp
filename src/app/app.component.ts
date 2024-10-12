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
  // Open the modal
  openModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }
  buttonClick()
  {
    
    //alert("hello");
      // Create a new element (e.g., a <p> element)
      const newElement = this.renderer.createElement('p');

      // Add text to the new element
      const text = this.renderer.createText('This is a new paragraph element.');
  
      // Append the text node to the newly created element
      this.renderer.appendChild(newElement, text);
  
      // Append the newly created element to the container div
      this.renderer.appendChild(this.container.nativeElement, newElement);
  }


  // Method to refresh table data

 
  refreshTableData() {
    // Clear the table data
    this.tableData = [];
  
    // Optionally, clear localStorage as well if needed
    localStorage.removeItem('tableData');
  }

}