import { Component, Output, EventEmitter, SimpleChanges, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../app-services/app-services-locations';
import { Location, Sublocation } from '../../app-services/app-services-locations';

@Component({
  selector: 'app-forum-general-details',
  templateUrl: './forum-general-details.component.html',
  styleUrls: ['./forum-general-details.component.css']
})
export class ForumGeneralDetailsComponent implements OnChanges {

  @Output() form3ValidityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() form2: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Input() submitForms: boolean = false;

  locations: Location[] = [];
  sublocations: { [key: string]: Sublocation[] } = {};
  generalDetailsForm!: FormGroup;
  telephoneNumbers: string[] = [];
  disableAddButton: boolean = false;
  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  disableAddImageButton: boolean = false;

  formData = new FormData();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private locationService: LocationService
  ) {
    // Assign values from LocationService to local properties
    this.locations = this.locationService.locations;
    this.sublocations = this.locationService.sublocations;

    // Create the general details form with validation
    this.generalDetailsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      sublocation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      images: ['', [Validators.required]]
    });

    // Observe form changes and emit event when form validity changes
    this.generalDetailsForm.valueChanges.subscribe(() => {
      this.emitFormValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['submitForms'] && changes['submitForms'].currentValue) {
      this.submitForm();
    }
  }

  // Function to emit form validity status
  private emitFormValidity() {
    const isValid = this.generalDetailsForm.valid && this.telephoneNumbers.length !== 0 && this.imageFiles.length !== 0;
    this.form3ValidityChanged.emit(isValid);
  }

  // Update sublocations based on the selected location
  updateSublocations() {
    const location = this.generalDetailsForm.get('location')?.value;
    this.generalDetailsForm.get('sublocation')?.setValue('');
    this.generalDetailsForm.get('sublocation')?.markAsUntouched();
    if (location) {
      this.sublocations[location];
    }
  }

  // Function to add a phone number to the list
  addPhoneNumber() {
    if (this.generalDetailsForm.get('phone')?.valid && this.telephoneNumbers.length < 3) {
      const phoneNumber = this.generalDetailsForm.get('phone')?.value;
      if (phoneNumber) {
        this.telephoneNumbers.push(phoneNumber);
        this.generalDetailsForm.get('phone')?.setValue('');
        this.generalDetailsForm.get('phone')?.setValidators([Validators.minLength(10), Validators.maxLength(10)]);
        this.generalDetailsForm.get('phone')?.updateValueAndValidity();
        this.disableAddButton = this.telephoneNumbers.length === 3;
      }
    }
  }

  // Function to remove a phone number from the list
  removePhoneNumber(index: number) {
    this.telephoneNumbers.splice(index, 1);
    if (this.telephoneNumbers.length === 0) {
      this.generalDetailsForm.get('phone')?.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
      this.generalDetailsForm.get('phone')?.updateValueAndValidity();
    }
    this.disableAddButton = this.telephoneNumbers.length === 3;
  }

  // Function to add an image to the list
  addImage(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const image = files[i];
        if (this.imageFiles.length < 6) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const imageDataUrl = e.target.result;
            this.imageCompress.compressFile(imageDataUrl, -1, 50, 50).then(
              result => {
                this.imagePreviews.push(result);
                this.imageFiles.push(image);
                this.generalDetailsForm.get('images')?.setValue(this.imageFiles);
                this.disableAddImageButton = this.imageFiles.length === 6;
              }
            );
          };
          reader.readAsDataURL(image);
        }
      }
      this.generalDetailsForm.get('images')?.setValue(this.imageFiles);
      event.target.value = '';
      this.disableAddImageButton = this.imageFiles.length === 6;
    }
  }

  // Function to remove an image from the list
  removeImage(index: number) {
    this.imageFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    this.generalDetailsForm.get('images')?.setValue(this.imageFiles);
    this.disableAddImageButton = this.imageFiles.length === 6;
  }

  // Function to submit the form
  private submitForm() {
    const formFieldMappings = [
      { fieldName: 'title', formDataKey: 'title' },
      { fieldName: 'description', formDataKey: 'description' },
      { fieldName: 'price', formDataKey: 'price' },
      { fieldName: 'location', formDataKey: 'location_id' },
      { fieldName: 'sublocation', formDataKey: 'sublocation_id' }
    ];

    // Append form field values to formData
    formFieldMappings.forEach(mapping => {
      const fieldValue = this.generalDetailsForm.get(mapping.fieldName)?.value;
      this.formData.append(mapping.formDataKey, fieldValue);
    });

    // Append telephone numbers
    for (let i = 0; i < this.telephoneNumbers.length; i++) {
      this.formData.append('telephoneNumbers[]', this.telephoneNumbers[i]);
    }

    // Append image files
    for (let i = 0; i < this.imageFiles.length; i++) {
      this.formData.append('images[]', this.imageFiles[i]);
    }

    this.form2.emit(this.formData);
  }
}
