import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partner, PartnerModel } from '../model/partner';
import { PartnerService } from '../service/partner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  partners: Partner[] = [];
  partnerModel = new PartnerModel('','','','');


  constructor(private partnerService: PartnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPartners();
  }

  getPartners():void{
    this.partnerService.getPartners().subscribe(partners => this.partners = partners)
  }

  deletePartner(id: number):void{
    this.partnerService.deletePartner(id).subscribe(() => {
      this.router.navigate(['dashboard']);
    });

  }

  searchPartner(event: any): void {
    const value = event.target.value;
    let filteredPartners = this.partners.filter(partner => partner.name.toLowerCase().includes(value.toLowerCase()));
    if (value.length > 0) this.partners = filteredPartners;
    else this.getPartners();
  }

}
