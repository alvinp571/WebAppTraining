import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partner, PartnerModel } from '../model/partner';
import { PartnerService } from '../service/partner.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {

  partners: Partner[]=[];

  constructor(
    private partnerService: PartnerService,
    private router: Router,
  ) {}

  modelPartner = new PartnerModel('','','','');
  submitted = false;

  onSubmit(){
    this.submitted = true;
    this.addPartner();
  }

  validateNo(e: any): boolean{
    const charCode = e.which ? e.which: e.KeyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57)) {return false}
    return true;
  }

  addPartner(
    name: string = this.modelPartner.name,
    phone: string = this.modelPartner.phone,
    skill: string = this.modelPartner.skill,
    notes: string = this.modelPartner.notes
    ): void{
      name = name.trim();
      phone = phone.trim();
      skill = skill.trim();
      notes = notes.trim();
      console.log(skill)
      
      if(skill != "Software Developer" && skill != "Java Developer" && skill != "UX Developer"){
        alert ("Skill should be /Software/Java/UX Developer !");
        this.router.navigate(["add"]);
        this.submitted=false
        return
      }
      this.partnerService.addPartner({name,phone,skill,notes} as Partner)
      .subscribe(partners => {this.partners.push(partners)})
      
      this.router.navigate(["dashboard"]);
  }

}
