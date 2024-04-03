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

  //selected category and subcategory by user
  selectedSubcategoryName!: string;
  selectedCategoryName!: string;

  //input of child components to submit their forms back
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
    console.log('Form Data from Child 3:');
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
      this.submitAllForms();
    }
  }

  // Method to check if all steps are completed
  areAllStepsCompleted(): boolean {
    return this.step1Completed && this.step2Completed && this.step3Completed && this.step4Completed;
  }
  
  // Show popup message and submit form
  submitAllForms(): void {
    // Send the HTTP request after a delay of one second
    setTimeout(() => {
    
      const successfullMsg = 'Advertisement submitted successfully.We will inform you once it is published.';
      const errorMsg = 'There was a problem posting your ad. Please try submitting it once more.';

      this.http.post('http://localhost:3000/api/generalDetails', this.allForms).subscribe(
        response => {
          // Display the snackbar message
          const snackBarRef = this.snackBar.open(successfullMsg, 'OK', {
            duration: 7000,
            verticalPosition: 'top',
            panelClass: ['customSnackbar1']
          });

          // Subscribe to the afterDismissed() Observable of the snackbar reference
          snackBarRef.afterDismissed().subscribe(() => {
            // Reload the browser after the snackbar is dismissed
            window.location.reload();
          });
          },

        error => {
          console.error('Error submitting advertisement:', error);
          // Display the snackbar message
          this.snackBar.open(errorMsg, 'OK', {
            duration: 7000,
            verticalPosition: 'top',
            panelClass:['customSnackbar2'] 
          });
        }
      );
    }, 1000); // Delay of 1000 milliseconds (1 second)
    
    // Log the form data
    this.allForms.forEach((value: FormDataEntryValue, key: string) => {
      console.log(`${key}: ${value}`);
    });
  }
}
