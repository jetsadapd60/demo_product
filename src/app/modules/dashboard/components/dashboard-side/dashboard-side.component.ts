import { Component, OnInit } from '@angular/core';

interface Menu {
  icon: string;
  label: string;
  url: string;
}

@Component({
  selector: 'app-dashboard-side',
  templateUrl: './dashboard-side.component.html',
  styleUrls: ['./dashboard-side.component.scss']
})
export class DashboardSideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public get menus(): Menu[] {
    return [
      { icon: '../../../../assets/images/store.png', label: 'หน้าแรก', url: '/' },
      { icon: '../../../../assets/images/chart-column.png', label: 'ซื้อ-ขาย', url: 'buy-sale' },
      { icon: '../../../../assets/images/sack.png', label: 'สินทรัพย์', url: 'asset' },
      { icon: '../../../../assets/images/wallet.png', label: 'รับ-จ่ายเงิน', url: 'receive-pay' },
    ]
  }
}
