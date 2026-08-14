import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './hero-page.component.html',
  imports: [ UpperCasePipe]
})

export class HeroPageComponent{
  name = signal('Iroman')
  age = signal(45)

  heroDescription = computed(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description;
  })

  capitalizedName = computed(() => this.name().toUpperCase());

  changeHero() {
    this.name.set('Spirderman');
    this.age.set(22)
  }

  changeAge(){
    this.age.set(60);
  }
  resetForm() {
    this.name.set('Iroman');
    this.age.set(45);
  }
}
