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
  @Output() form3: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Input() submitForms: boolean = false;

  locations: Location[] = [];
  sublocations: { [key: string]: Sublocation[] } = {};
  generalDetailsForm!: FormGroup;
  telephoneNumbers: string[] = [];
  disableAddButton: boolean = false;
  imageFiles: File[] = [];
  imagePreviews: string[] = [];
  disableAddImageButton: boolean = false;
  uploadingImages: boolean = false;
  errorMessage = ''; // Variable to hold the error message


  formData = new FormData();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService,
    private locationService: LocationService
  ) {

    setTimeout(()=>{
      // Assign values from LocationService to local properties
      this.locations = this.locationService.locations;
      this.sublocations = this.locationService.sublocations;
    },500);


    // Create the general details form with validation
    this.generalDetailsForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[1-9][0-9]*\.?[0-9]*$")]],
      location: ['', Validators.required],
      sublocation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^0[0-9]{9}$")]],
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
        this.generalDetailsForm.get('phone')?.setValidators(Validators.pattern("^0[0-9]{9}$"));
        this.generalDetailsForm.get('phone')?.updateValueAndValidity();
        this.disableAddButton = this.telephoneNumbers.length === 3;
      }
    }
  }

  // Function to remove a phone number from the list
  removePhoneNumber(index: number) {
    this.telephoneNumbers.splice(index, 1);
    if (this.telephoneNumbers.length === 0) {
      this.generalDetailsForm.get('phone')?.setValidators([Validators.required, Validators.pattern("^0[0-9]{9}$")]);
      this.generalDetailsForm.get('phone')?.updateValueAndValidity();
    }
    this.disableAddButton = this.telephoneNumbers.length === 3;
  }

  addImage(event: any) {
    this.uploadingImages = true; // Set uploadingImages to true when starting to upload images
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
                // Check if compressed image size is less than or equal to 10MB
                if (this.getFileSize(result) <= 5 * 1024 * 1024) {
                  this.imagePreviews.push(result);
                  this.imageFiles.push(image);
                  this.generalDetailsForm.get('images')?.setValue(this.imageFiles);
                  this.disableAddImageButton = this.imageFiles.length === 6;
                  this.uploadingImages = false;
                  this.errorMessage ='';
                } else {
                  this.uploadingImages = false;
                  // Display error message for images larger than 10MB
                  this.errorMessage = "Image size cannot exceed 5MB. Please upload a different image.";
                }
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
  
  // Function to get file size from data URL
  getFileSize(dataURL: string): number {
    const head = 'data:image/jpeg;base64,';
    return (dataURL.length - head.length) * 3 / 4;
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

    this.form3.emit(this.formData);
  }
}
