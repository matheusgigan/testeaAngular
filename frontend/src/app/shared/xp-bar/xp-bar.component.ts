import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-xp-bar',
  standalone: true,
  templateUrl: './xp-bar.component.html',
  styleUrl: './xp-bar.component.css'
})
export class XpBarComponent implements OnInit {
  @Input() username: string = '';
  xp: number = 0;

  ngOnInit() {
    this.xp = this.getXp();
  }

  getXp(): number {
    if (typeof window !== 'undefined' && window.localStorage && this.username) {
      return Number(localStorage.getItem(`xp_${this.username}`)) || 0;
    }
    return 0;
  }

  getLevel(): number {
    return Math.floor(this.xp / 100) + 1;
  }

  getLevelProgress(): number {
    return this.xp % 100;
  }

  getLevelProgressPercent(): number {
    return (this.getLevelProgress() / 100) * 100;
  }
}