import { Component, SimpleChanges } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forum-promote-ad',
  templateUrl: './forum-promote-ad.component.html',
  styleUrls: ['./forum-promote-ad.component.css'] // Corrected styleUrls from styleUrl
})
export class ForumPromoteAdComponent {

  promoteAdForm!: FormGroup;
  postChecked = true;
  promoteChecked = true;
  selectedDuration1 = '4Days';
  selectedDuration2 = '4Days';
  selectedDuration3 = '4Days';

  @Output() form4ValidityChanged = new EventEmitter<boolean>();
  @Input() submitForms: boolean = false;

  constructor(private fb: FormBuilder) {
    // Initialize form group and form controls
    this.promoteAdForm = this.fb.group({
      free: [false],
      bumpUp: [false],
      topAd: [false],
      urgent: [false],
    });

    // Subscribe to changes in the "free" checkbox
    this.promoteAdForm.get('free')?.valueChanges.subscribe((value) => {
      if (value) {
        // If "Free" is checked, uncheck the other checkboxes
        this.resetPromotionCheckboxes();
      } else {
        this.postChecked = true;
      }
    });

    // Subscribe to changes in other checkboxes
    ['bumpUp', 'topAd', 'urgent'].forEach(controlName => {
      this.promoteAdForm.get(controlName)?.valueChanges.subscribe((value) => {
        if (value) {
          // If any other checkbox is checked, uncheck "Free"
          this.resetFreeCheckbox();
        } else {
          this.updatePromoteCheckedState();
        }
      });
    });
  }

  // Method to reset all promotion checkboxes
  resetPromotionCheckboxes() {
    this.promoteAdForm.get('bumpUp')?.setValue(false);
    this.promoteAdForm.get('topAd')?.setValue(false);
    this.promoteAdForm.get('urgent')?.setValue(false);
    this.postChecked = false;
    this.promoteChecked = true;
  }

  // Method to reset the "Free" checkbox
  resetFreeCheckbox() {
    this.promoteAdForm.get('free')?.setValue(false);
    this.postChecked = true;
    this.promoteChecked = false;
  }

  // Method to update the state of "promoteChecked" based on other checkboxes
  updatePromoteCheckedState() {
    const allUnchecked = !this.promoteAdForm.get('bumpUp')?.value &&
                         !this.promoteAdForm.get('topAd')?.value &&
                         !this.promoteAdForm.get('urgent')?.value;

    this.promoteChecked = allUnchecked ? true : false;
  }

  // Method triggered when the post button is clicked
  onPostButtonClick() {
    // Emit true when the post button is clicked
    this.form4ValidityChanged.emit(true);
  }

  // Lifecycle hook for detecting changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['submitForms'] && changes['submitForms'].currentValue) {
      this.submitForm();
    }
  }

  // Method to handle form submission
  submitForm() {
    console.log('Form submitted from child component');
    // Implement form submission logic here
  }
}
