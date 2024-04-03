import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent {   

  // Stepper linear mode
  isLinear = true;

  // Stepper restrict next step
  step1Completed: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;
  step4Completed: boolean = false;

  selectedSubcategoryName!: string;
  selectedCategoryName!: string;

  submitForms: boolean = false;

  // Initialize FormData object to hold combined form data
  allForms: FormData = new FormData();

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  // Handlers for form validity changes
  handleValidityChanged1(event: boolean) {
    this.step1Completed = event;
  }

  handleValidityChanged2(event: boolean) {
    this.step2Completed = event;
  }

  handleValidityChanged3(event: boolean) {
    this.step3Completed = event;
  }

  handleValidityChanged4(event: boolean) {
    this.step4Completed = event;
    this.checkSubmitForms();
  }

  // Transmit selected subcategory
  transmitSubcategory(subcategoryName:string){
    this.selectedSubcategoryName = subcategoryName;    
  }
  // Transmit selected subcategory
  transmitCategory(categoryName:string){
    this.selectedCategoryName = categoryName;  
  }

  // Append form data for form 1
  form1test(formData: FormData){
    console.log('Form Data from Child 1:');
    formData.forEach((value: FormDataEntryValue, key: string) => {
      console.log(`${key}: ${value}`);
      // Append data to allForms
      this.allForms.append(key, value);
    });
  }

  // Append form data for form 2
  form2test(formData: FormData){
    console.log('Form Data from Child 2:');
    formData.forEach((value: FormDataEntryValue, key: string) => {
      console.log(`${key}: ${value}`);
      // Append data to allForms
      this.allForms.append(key, value);
    });
  }

  // Append form data for form 3
  form3test(formData: FormData){
    console.log('Form Data from Child 2:');
    formData.forEach((value: FormDataEntryValue, key: string) => {
      console.log(`${key}: ${value}`);
      // Append data to allForms
      this.allForms.append(key, value);
    });
  }

  // Check if all steps are completed
  checkSubmitForms() {
    // Logic to determine when to submit forms
    this.submitForms = this.areAllStepsCompleted();
    if (this.submitForms) {
      this.showPopupMessage('Your ad will be review and posted');
    }
  }

  // Method to check if all steps are completed
  areAllStepsCompleted(): boolean {
    return this.step1Completed && this.step2Completed && this.step3Completed && this.step4Completed;
  }
  
  // Show popup message and submit form
  showPopupMessage(message: string): void {
    // Send the HTTP request after a delay of one second
    setTimeout(() => {
      this.http.post('http://localhost:3000/api/generalDetails', this.allForms).subscribe(
        response => {
          console.log('worked !', response);
          // Handle success
        },
        error => {
          console.error('Error submitting advertisement:', error);
          // Handle error
        }
      );
    }, 1000); // Delay of 1000 milliseconds (1 second)
  
    // Display the snackbar message
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration the message should be displayed (in milliseconds)
    });
  
    // Log the form data
    this.allForms.forEach((value: FormDataEntryValue, key: string) => {
      console.log(`${key}: ${value}`);
    });
  }
}
