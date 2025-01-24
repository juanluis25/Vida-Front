import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../services/persona/persona.service';
import { Persona } from '../../models/Persona';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ver-personas',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ver-personas.component.html',
  styleUrls: ['./ver-personas.component.css']
})
export class VerPersonasComponent {

  personas: Persona[] = [];
  selectedPersona: Persona | null = null;  // Persona seleccionada para editar
  personaForm: FormGroup;

  constructor(private personaService: PersonaService, private fb: FormBuilder) {

    this.personaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidopaterno: ['', [Validators.required]],
      apellidomaterno: ['', [Validators.required]],
      edad: [null, [Validators.required]],
      telefono: ['', [Validators.required]],
      estadocivil: ['', [Validators.required]],
      comosupistedeiglesia: ['', [Validators.required]],
      colonia: ['', [Validators.required]],
      nombrevoluntario: ['', [Validators.required]],
      condicionvisita: ['', [Validators.required]],
      grupopequeñointeres: ['', [Validators.required]]
    });

    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this.personaService.findAll().subscribe({
      next: (personas) => {
        this.personas = personas;
        console.log('Personas registradas:', this.personas);
      },
      error: (error) => {
        console.error('Error al obtener personas:', error);
      }
    });
  }
  updateField(){
    const opcionElegida = document.getElementById("filtro") as HTMLSelectElement;
    
    this.personaService.filtrarPersonas(opcionElegida.value, null, null, null).subscribe({
      next: (personas) => {
        console.log('Field is updated!');
      },
      error: (error) => {
      console.log('Field is updated!');
      }
    });
    
  }
}
