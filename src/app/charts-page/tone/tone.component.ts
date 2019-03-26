import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AudioContext } from 'angular-audio-context';

@Component({
  selector: 'aredn-tone',
  templateUrl: './tone.component.html',
  styleUrls: ['./tone.component.scss']
})
export class ToneComponent implements OnInit, OnChanges {

  @Input() snr: number;

  oscillator: any;
  gainNode: any;
  toneActive: boolean = false;
  pitch: number = 50;
  volume: number = 5;

  constructor(private audioContext: AudioContext) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.toneFreq();
  }

  ngOnInit() {

  }

  onSettingsChanged() {
    this.toneFreq();
  }

  private setupOscillator() {
    this.oscillator = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();
    this.oscillator.connect(this.gainNode);
    this.oscillator.type = 'sine';
    this.gainNode.connect(this.audioContext.destination);
  }

  private toneFreq() {
    let snr = this.snr;
    this.oscillator.frequency.value = snr * this.pitch;
    this.gainNode.gain.value = this.volume / 10;
  }

  toneOn() {
    this.setupOscillator();
    this.toneFreq();
    this.oscillator.start();
    this.toneActive = true;
  }

  toneOff() {
    this.oscillator.stop();
    this.toneActive = false;
  }
}
