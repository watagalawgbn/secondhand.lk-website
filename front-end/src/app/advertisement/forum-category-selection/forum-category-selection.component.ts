import { Component, Input, SimpleChanges, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../app-services/app-service-categories'; // Update the path accordingly
import { Category, Subcategory } from '../../app-services/app-service-categories';

@Component({
  selector: 'app-forum-category-selection',
  templateUrl: './forum-category-selection.component.html',
  styleUrls: ['./forum-category-selection.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class ForumCategorySelectionComponent {
  // Output events to emit data to parent component
  @Output() subcategorySelected: EventEmitter<string> = new EventEmitter<string>();//output selected subcategory to parent.
  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();//output selected category to parent.

  @Output() form1: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() form1ValidityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();//output validity of the form to parent.

  // Input to trigger form submission
  @Input() submitForms: boolean = false;

  // Properties related to categories and subcategories
  categories: Category[] = [];
  subcategories: { [key: string]: Subcategory[] } = {};
  selectedCategory: string = '';
  categorySelectionForm: FormGroup;
  formData = new FormData();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    // Initialize the form with validators
    this.categorySelectionForm = this.fb.group({
      adType: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required]
    });

    setTimeout(() => {
      this.categories = this.categoryService.categories;
      this.subcategories = this.categoryService.subcategories;
    }, 500); // Adjust the delay time as needed
    
  }

  // Update the selected category
  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
  }

  //encode category names for icon upload
  encodeCategoryName(category: string): string {
    return encodeURIComponent(category);
  }

  // Method called when moving to the next step
  onNext() {
    // Subscribe to form value changes
    this.categorySelectionForm.valueChanges.subscribe(() => {
      if (this.categorySelectionForm.valid) {
        this.form1ValidityChanged.emit(true);// Emit the validity status of the form.
        const selectedSubcategory = String();// Emit the selected subcategory
        this.subcategorySelected.emit(selectedSubcategory);// Emit the selected subcategory
        const selectedcategory = String(this.categorySelectionForm.get('category')?.value);
        this.categorySelected.emit(selectedcategory);
      }
    });
  }

  // Method called when inputs change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['submitForms'] && changes['submitForms'].currentValue) {
      this.submitForm();
    }
  }

  // Method to submit the form
  submitForm() {
    // Array of form field names and their corresponding formData keys
    const formFieldMappings = [
      { fieldName: 'adType', formDataKey: 'adType' },
      { fieldName: 'category', formDataKey: 'category_id' },
      { fieldName: 'subcategory', formDataKey: 'subcategory_id' }
    ];

    // Iterate over form field names and append data to formData
    formFieldMappings.forEach(mapping => {
      const fieldValue = this.categorySelectionForm.get(mapping.fieldName)?.value;
      this.formData.append(mapping.formDataKey, fieldValue);
    });

    // Emit the form data
    this.form1.emit(this.formData);     
  }
}
