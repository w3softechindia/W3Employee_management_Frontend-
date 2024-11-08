import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RmsServiceService } from '../../rms_component/rms-service.service';

@Component({
  selector: 'app-document-verification-form',
  templateUrl: './document-verification-form.component.html',
  styleUrls: ['./document-verification-form.component.scss']
})
export class DocumentVerificationFormComponent {
  documentForm: FormGroup;

  constructor(private fb: FormBuilder, private rmsService: RmsServiceService) {
    this.documentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: ['', Validators.required],
      collegeName: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      overallCgpa: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      degreeCertificate: [null],
      twelthCertificate: [null],
      tenthCertificate: [null],
      aadhaar: [null],
      pan: [null],
      confirmation: ['', Validators.required]
    });
}


  submitForm(): void {
    if (this.documentForm.valid) {
      const formData = new FormData();
      Object.keys(this.documentForm.controls).forEach(key => {
        const controlValue = this.documentForm.get(key)?.value;
        if (controlValue instanceof File) {
          formData.append(key, controlValue);
        } else {
          formData.append(key, controlValue ?? '');
        }
      });

      this.rmsService.submitApplicantForm(formData).subscribe({
        next: (response) => {
          console.log('Form submitted successfully', response);
          alert('Form submitted successfully');  // Show success alert
        },
        error: (error) => console.error('Error submitting form', error)
      });
    } else {
      console.log('Form is not valid');
    }
  }

  handleFileInput(event: any, fieldName: string): void {
    const file: File = event.target.files[0];
    if (file) {
      this.documentForm.get(fieldName)?.setValue(file);
    }
  }
}
