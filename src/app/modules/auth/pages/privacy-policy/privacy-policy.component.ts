import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit, AfterViewInit, OnDestroy {
  
  public agreeForm!: FormGroup;
  private subscription!: Subscription;

  enableButton: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

    let observ1 = this.agreeForm.valueChanges.subscribe(
      ({agreeOne, agreeTwo}) => {
        if (agreeOne && agreeTwo) {
          this.enableButton = true;
        } else {
          this.enableButton = false;
        }
      }
    );

    this.subscription?.add(observ1);
  }

  ngAfterViewInit(): void {
    
    // this.agree.toArray().forEach(item => console.log(item.checkValidity()))
  }

  private buildForm() {
    this.agreeForm = this.fb.group({
      agreeOne: [null, [Validators.required]],
      agreeTwo: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
