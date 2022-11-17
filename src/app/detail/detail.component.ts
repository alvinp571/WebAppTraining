import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Partner, PartnerModel } from '../model/partner';
import { PartnerService } from '../service/partner.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  partners: Partner[] = [];
  partner: Partner | undefined;
  partnerFormGroup: FormGroup;
  idParams: number = 0;

  constructor(
    private partnerService: PartnerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { 
    this.partnerFormGroup = this.formBuilder.group({
      name: new FormControl(''),
      phone: new FormControl(''),
      skill: new FormControl(''),
      notes: new FormControl('')
    });
  }

  modelPartner = new PartnerModel('','','','');
  submitted = false;

  ngOnInit(): void {
    this.getPartner();
  }

  onSubmit(){
    this.submitted = true;
    this.updatePartner();
  }

  getPartner(): void{
    this.idParams = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.idParams);
    this.partnerService.getPartner(this.idParams).subscribe(partners => {
      this.partnerFormGroup.get('name')?.setValue(partners.name);
      this.partnerFormGroup.get('phone')?.setValue(partners.phone);
      this.partnerFormGroup.get('skill')?.setValue(partners.skill);
      this.partnerFormGroup.get('notes')?.setValue(partners.notes);
      this.partner = partners;
    });
  }

  validateNo(e: any): boolean{
    const charCode = e.which ? e.which: e.KeyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)) {return false}
    return true;
  }

  updatePartner(
    name: string = this.partnerFormGroup.get('name')?.value,
    phone: string = this.partnerFormGroup.get('phone')?.value,
    skill: string = this.partnerFormGroup.get('skill')?.value,
    notes: string = this.partnerFormGroup.get('notes')?.value
    ): void{
      console.log(this.partnerFormGroup.value);
      
      name = name.trim();
      phone = phone.trim();
      skill = skill.trim();
      notes = notes.trim();
      if(skill != "software developer" && skill != "java developer" && skill != "ux developer"){
        alert ("Skill should be /software/java/ux developer !");
        return
      }
      this.partnerService.updatePartner(
        {
          id: this.idParams,
          ...this.partnerFormGroup.value
        } as Partner)
      .subscribe(a => {this.partners.push(a)})
  }

}
