import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RmsServiceService } from '../../rms_component/rms-service.service';

@Component({
  selector: 'app-document-verification-form',
  templateUrl: './document-verification-form.component.html',
  styleUrls: ['./document-verification-form.component.scss']
})
export class DocumentVerificationFormComponent {
  documentForm!: FormGroup;

  constructor(private fb: FormBuilder, private rmsService: RmsServiceService) {
    this.documentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: ['', Validators.required],
      collegeName: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      overallCgpa: [null, [Validators.required]],
      degreeCertificate: [null],
      twelthCertificate: [null],
      tenthCertificate: [null],
      aadhaar: [null],
      pan: [null],
      confirmation: ['', Validators.required]
    });
  }

  // Handle form submission
  submitForm() {
    if (!this.documentForm.valid) {
      console.log('Form is not valid');
      alert('Please fill out all required fields before submitting.');
      this.highlightInvalidControls();
      return;
    }

    const formData = new FormData();

    // Loop through form controls and append each to FormData
    Object.keys(this.documentForm.controls).forEach(key => {
      const controlValue = this.documentForm.get(key)?.value;
      
      // Check if controlValue is a file or regular input and add to formData
      if (controlValue) {
        if (controlValue instanceof File) {
          formData.append(key, controlValue);
        } else {
          formData.append(key, controlValue.toString());
        }
      }
    });

    // Submit the form data using the service
    this.rmsService.submitApplicantForm(formData).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
        alert('Form submitted successfully');
        
        // Reset form after successful submission
        this.documentForm.reset();
        this.resetFileInputs(); // Reset file inputs explicitly
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again.');
      }
    });
  }

  // Handle file input and set file in form control
  handleFileInput(event: any, fieldName: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.documentForm.get(fieldName)?.setValue(file);
    }
  }

  // Function to reset file input controls
  private resetFileInputs() {
    this.documentForm.patchValue({
      degreeCertificate: null,
      twelthCertificate: null,
      tenthCertificate: null,
      aadhaar: null,
      pan: null
    });
  }

  // Function to highlight invalid controls for debugging
  private highlightInvalidControls() {
    Object.keys(this.documentForm.controls).forEach(key => {
      const control = this.documentForm.get(key);
      if (control && control.invalid) {
        console.error(`Invalid control: ${key}`, control.errors);
      }
    });
  }
}
