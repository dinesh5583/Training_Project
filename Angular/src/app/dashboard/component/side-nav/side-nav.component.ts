import { Component, NgZone, OnInit } from '@angular/core';
const MAX_WIDTH_BREAKPOINT=720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  private mediaMatcher=
  window.matchMedia(`(max-width: ${MAX_WIDTH_BREAKPOINT}px)`)

  links=[{
    name:'Admins',
    url:'admin'
  },
  {
    name:'Category',
    url:'category'
  },
  {
    name:'Product',
    url:'product'
  }
]
  constructor(){
    this.mediaMatcher.addEventListener('change',()=>{
      this.isScreenSmall();
      })


  }

  ngOnInit(): void {
  }

  isScreenSmall(){
    return this.mediaMatcher.matches
  }
}


