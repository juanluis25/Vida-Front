import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Persona } from '../../models/Persona';
import { PersonaService } from '../../services/persona/persona.service';


@Component({
  selector: 'app-persona',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent{
  
  private personaService = inject(PersonaService);
  
  estadoCivilOpciones = [
    {id: 'Soltero(a)', nombre: 'Soltero(a)'},
    {id: 'Casado(a)', nombre: 'Casado(a)'},
    {id: 'Divorciado(a)', nombre: 'Divorciado(a)'},
    {id: 'Viudo(a)', nombre: 'Viudo(a)'},
    {id: 'Unión Libre', nombre: 'Unión Libre'},
  ];
  personaForm = new FormGroup({
    nombre: new FormControl('',{nonNullable: true}),
    apellidopaterno: new FormControl('',{nonNullable: true}),
    apellidomaterno: new FormControl('', {nonNullable: true}),
    edad: new FormControl('',{nonNullable: true}),
    estadocivil: new FormControl('',{nonNullable: true}),
    telefono: new FormControl('',{nonNullable: true}),
    comosupistedeiglesia: new FormControl('',{nonNullable: true}),
    colonia: new FormControl('',{nonNullable: true}),
    nombrevoluntario: new FormControl('',{nonNullable: true}),
    condicionvisita: new FormControl('',{nonNullable: true}),
    grupopequeñointeres: new FormControl('',{nonNullable: true})
  });
  
  onSubmit() {
    const formValue = this.personaForm.value;

    const persona: Persona = {
      id: 0,
      nombre: formValue.nombre || "",
      apellidopaterno: formValue.apellidopaterno || "",
      apellidomaterno: formValue.apellidomaterno || "",
      edad: Number(formValue.edad) || 0,
      estadocivil: formValue.estadocivil || "",
      telefono: formValue.telefono || "",
      comosupistedeiglesia: formValue.comosupistedeiglesia || "",
      colonia: formValue.colonia || "",
      nombrevoluntario: formValue.nombrevoluntario || "",
      condicionvisita: formValue.condicionvisita || "",
      grupopequeñointeres: formValue.grupopequeñointeres || "",
      oraciondefe: false
    };
    this.personaService.create(persona).subscribe({
      next: response => {
        console.log("todo bien");
        this.limpiarForm();
      },
      error: err => {
        console.log("error");
      }

    });
  }
  limpiarForm() {
    this.personaForm.reset();
  }
}
    
