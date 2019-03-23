import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "aredn-sort-icon",
  templateUrl: "./sort-icon.component.html",
  styleUrls: ["./sort-icon.component.scss"]
})
export class SortIconComponent implements OnInit {
  @Input() active: boolean = false;
  @Input() desc: boolean = false;

  constructor() { }

  ngOnInit() { }
}
